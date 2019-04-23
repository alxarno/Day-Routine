import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { IRoutine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { IDeadZone } from "src/models/dead_zone";
import { IScheduleUnit, ScheduleUnitType } from "src/models/schedule.unit";
import {
  RoutinesHoursPerWeekSpent,
  GetCoefficients,
  SortRoutinesByFinishingCoefficients,
} from "./schedule.methods";

function Copy(d: object): object {
  return {...d};
}

const defaultDeadZone: IDeadZone = {
  ID: -1,
  disabled_days: [],
  done: 24,
  start: 0,
  enable: true,
  name: "✔️Empty",
};

export class ScheduleCore extends CoreModule implements IScheduleCore {
  private lastTaskHourSpending: number;
  private rtnSpentWeek: {[key: number]: number};
  private rtnSpentWeekCopy: {[key: number]: number};
  private rtnSpentCoefficients: {[key: number]: number};
  private rtnsSeqSorted: number[];
  private finalSchedule: IScheduleUnit[];

  private routines: IRoutine[];
  private activities: IStatistics[];
  private deadZones: IDeadZone[];

  constructor(props: {[key: string]: any}) {
    super(props);
    this.lastTaskHourSpending = 1;
    this.rtnSpentWeek = {};
    this.rtnSpentWeekCopy = {};
    this.rtnSpentCoefficients = {};
    this.rtnsSeqSorted = [];

    this.finalSchedule = [];

    this.routines = [];
    this.activities = [];
    this.deadZones = [];
  }

  public Clear() {
    if (this.cache) {
      this.cache.Clear();
    }
  }

  public async Get(): Promise<IScheduleUnit[]> {
    let cashShedule: any[] = [];
    // Checking already created schedule in cash
    if (this.cache) {
      cashShedule = this.cache.Get();
    }
    if (cashShedule.length !== 0) {
      return cashShedule;
    }

    // Geting necessary information about holding routines, statistics, dead zones
    if (!this.storage) {return []; }
    this.clearBuffs();
    this.routines = await this.storage.Routines().Get();
    // console.log(this.routines);
    this.activities = await this.storage.Statistics().Get();
    this.deadZones = await this.storage.DeadZones().Get();

    // 0 is Sunday, but need 0 is Monday
    let day: number = new Date().getDay() - 1;
    if (day < 0) { day++; }

    // Filtering dead zones by today
    this.deadZones = this.deadZones.filter((dz: IDeadZone) => {
      if (!dz.enable) { return false; }
      if (dz.disabled_days.indexOf(day) !== -1) { return false; }
      return true;
    });
    // console.log(this.activities, this.routines);
    if (this.activities.length === 0 && this.routines.length === 0) {
      return [...Array(24)].map(() => {
        return {data: defaultDeadZone, _type: ScheduleUnitType.DeadZone};
      });
    }

    // Get map when {[routine id]: spented hours in last week}
    this.rtnSpentWeek = RoutinesHoursPerWeekSpent(this.activities);
    this.rtnSpentWeekCopy = {...this.rtnSpentWeek};

    this.rtnSpentCoefficients =
       GetCoefficients(this.routines, Copy(this.rtnSpentWeek) as {[key: number]: number});

    // Sorting routines by "finishing" coefficients
    this.rtnsSeqSorted  =
       SortRoutinesByFinishingCoefficients(Copy(this.rtnSpentCoefficients) as {[key: number]: number});
    // Array.from({length: 24}, (x, i) => i).forEach(this.taskFromHour.bind(this));
    for (let i = 0; i < 24; i++) {
      this.taskFromHour(i);
    }
    if (this.cache) {
      this.cache.Set(this.finalSchedule);
    }
    return [...this.finalSchedule];
  }

  private taskFromHour(hour: number) {
    if (this.lastTaskHourSpending > 1) {
      this.lastTaskHourSpending--;
      return;
    }
    const nowDeadZone: (IDeadZone | null) = this.isNowDeadZone(hour);
    if (nowDeadZone) {
      this.finalSchedule.push({data: nowDeadZone, _type: ScheduleUnitType.DeadZone});
      return ;
    } else {
      const hoursBeforeDeadZone = this.hoursBeforeDeadZone(hour);
      let routine: IRoutine | null = null;
      let necessaryCoef = 0;
      const finRoutines = () => {
        this.routines.forEach((r: IRoutine) => {
          if (r.ID === this.rtnsSeqSorted[necessaryCoef] && r.minDurationHours <= hoursBeforeDeadZone) {
            routine = r;
          }
        });
        if (routine == null) {
          necessaryCoef++;
          if (necessaryCoef >= this.rtnsSeqSorted.length) {
            return;
          } else {
            finRoutines();
          }
        }
      };
      finRoutines();

      if (routine == null) {
        this.finalSchedule.push({data: defaultDeadZone, _type: ScheduleUnitType.DeadZone});
        return;
      }
      // console.log("Routine found");
      const froutine: IRoutine = routine as IRoutine;
      this.finalSchedule.push({
        data: {
          ID: froutine.ID,
          name: froutine.name,
          actionBody: froutine.actionBody,
          actionType: froutine.actionType,
          color: froutine.colorScheme,
          describe: froutine.describe,
          hours: froutine.minDurationHours,
          start: hour,
        },
        _type: ScheduleUnitType.Task,
      });

      this.rtnSpentWeekCopy[froutine.ID]++;
      this.rtnSpentCoefficients = GetCoefficients(this.routines,
         Copy(this.rtnSpentWeekCopy) as {[key: number]: number});
      // Rebuild
      this.rtnsSeqSorted =
         SortRoutinesByFinishingCoefficients(Copy(this.rtnSpentCoefficients) as {[key: number]: number});
      this.lastTaskHourSpending = froutine.minDurationHours;
    }
  }

  private clearBuffs() {
    this.rtnSpentWeek = {};
    this.rtnSpentWeekCopy = {};
    this.rtnSpentCoefficients = {};
    this.rtnsSeqSorted = [];

    this.finalSchedule = [];

    this.routines = [];
    this.activities = [];
    this.deadZones = [];
  }

  private isNowDeadZone(hour: number): (IDeadZone | null) {
    let result: (IDeadZone | null) = null;

    this.deadZones.forEach((dz: IDeadZone) => {
      if (result) { return; }
      if (dz.start > dz.done) {
        if (hour >= dz.start || hour < dz.done) { result = dz; }
      } else {
        if (hour >= dz.start && hour < dz.done) { result = dz; }
      }
    });

    return result;
  }

  private hoursBeforeDeadZone(hour: number): number {
    let hoursBefore = 0;
    for (let i = hour; i < 23; i++) {
      if (!this.isNowDeadZone(i)) {
        hoursBefore++;
      } else {
        return hoursBefore;
      }
    }
    return hoursBefore;
  }
}

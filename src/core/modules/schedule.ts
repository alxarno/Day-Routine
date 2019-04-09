import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { IRoutine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { IDeadZone } from "src/models/dead_zone";
import { INowTask } from "src/models/now.tasks";
import { RoutinesHoursPerWeekSpent,
   GetCoefficients,
   SortRoutinesByFinishingCoefficients } from "./schedule.methods";
import { routines } from "src/view/store/modules/routines";

function Copy(d: object): object {
  return {...d};
}

export class ScheduleCore extends CoreModule implements IScheduleCore {
  private lastTaskHourSpending: number;
  private rtnSpentWeek: {[key: number]: number};
  private rtnSpentWeekCopy: {[key: number]: number};
  private rtnSpentCoefficients: {[key: number]: number};
  private rtnsSeqSorted: number[];
  private finalSchedule: Array<INowTask | null>;

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

  public async Get(): Promise<Array<INowTask | null>> {
    const cashShedule: any[] = [];
    // Checking already created schedule in cash
    if (this.cash) {
      // cashShedule = this.cash.Get();
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

    if (this.activities.length === 0 && this.routines.length === 0) { return [...Array(24)].map(() => null); }

    // Get map when {[routine id]: spented hours in last week}
    this.rtnSpentWeek = RoutinesHoursPerWeekSpent(this.activities);
    this.rtnSpentWeekCopy = {...this.rtnSpentWeek};

    this.rtnSpentCoefficients =
       GetCoefficients(this.routines, Copy(this.rtnSpentWeek) as {[key: number]: number});

    // Sorting routines by "finishing" coefficients
    this.rtnsSeqSorted  =
       SortRoutinesByFinishingCoefficients(Copy(this.rtnSpentCoefficients) as {[key: number]: number});
    Array.from({length: 24}, (x, i) => i).forEach(this.taskFromHour.bind(this));
    if (this.cash) {
      this.cash.Set(this.finalSchedule);
    }
    return [...this.finalSchedule];
  }

  private taskFromHour(hour: number) {
    if (this.lastTaskHourSpending > 1) {
      this.lastTaskHourSpending--;
      return;
    }
    if (this.isNowDeadZone(hour)) {
      this.finalSchedule.push(null);
      return;
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

      if (routine == null) {this.finalSchedule.push(null); return; }

      const froutine: IRoutine = routine as IRoutine;
      this.finalSchedule.push({
        ID: froutine.ID,
        name: froutine.name,
        actionBody: froutine.actionBody,
        actionType: froutine.actionType,
        color: froutine.colorScheme,
        describe: froutine.describe,
        hours: froutine.minDurationHours,
        start: hour,
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

  private isNowDeadZone(hour: number): boolean {
    let fin: boolean = false;

    this.deadZones.forEach((dz: IDeadZone) => {
      if (fin) { return; }
      if (dz.start > dz.done) {
        if (hour >= dz.start || hour < dz.done) { fin = true; }
      } else {
        if (hour >= dz.start && hour < dz.done) { fin = true; }
      }
    });

    return fin;
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

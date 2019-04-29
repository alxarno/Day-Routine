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
import { INowTask } from "src/models/now.tasks";

function Copy(d: object): object {
  return {...d};
}

export const defaultDeadZone: IDeadZone = {
  ID: -1,
  disabledDays: [],
  done: 24,
  start: 0,
  enable: true,
  name: "✔️ Relax",
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

  public async GetCurrentTask(): Promise<IScheduleUnit> {
    const schedule: IScheduleUnit[] = await this.Get();

    const targetHOUR = new Date().getHours();
    let hourCounter = 0;
    let answer: IScheduleUnit = {
      data: defaultDeadZone,
      _type: ScheduleUnitType.DeadZone,
    };

    schedule.forEach((v) => {
      if (hourCounter > targetHOUR) {return; }

      const hours: number = (v._type === ScheduleUnitType.DeadZone ? 1 : (v.data as INowTask).hours);
      if (v.data.start <= targetHOUR && targetHOUR < v.data.start + hours) {
          answer = v;
        }
      hourCounter += hours;
      return;
    });
    return answer;
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
        if (dz.disabledDays.indexOf(day) !== -1) { return false; }
        return true;
      });
      // If nothing found just adding "empty" deadzones
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

      for (let i = 0; i < 24; i++) {
        this.taskFromHour(i);
      }
      if (this.cache) {
        this.cache.Set(this.finalSchedule);
      }
      return [...this.finalSchedule];
    }

  private taskFromHour(hour: number) {
      // if last task duration is more than 1 hour, we need skip current hour
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
        const routine: IRoutine | null = this.findCurrentRoutine(0, hoursBeforeDeadZone, hour);

        if (routine == null) {
          this.finalSchedule.push({data: defaultDeadZone, _type: ScheduleUnitType.DeadZone});
          return;
        }

        const froutine: IRoutine = routine as IRoutine;
        this.finalSchedule.push(this.getScheduleUnitByRoutine(froutine, hour));

        this.rtnSpentWeekCopy[froutine.ID]++;

        // Updating data sets
        this.rtnSpentCoefficients = GetCoefficients(this.routines,
          Copy(this.rtnSpentWeekCopy) as {[key: number]: number});
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

  private findCurrentRoutine(tryCounter: number, hoursBeforeDeadZone: number, hour: number): IRoutine | null {
      let routine: IRoutine | null = null;

      this.routines.forEach((r: IRoutine) => {
        if (r.ID === this.rtnsSeqSorted[tryCounter]
          && r.minDurationHours <= hoursBeforeDeadZone) {
            if (tryCounter <= this.rtnsSeqSorted.length / 2) {
              if (this.isHourInDayZone(hour, r.dayZone)) {
                routine = r;
              }
            } else {
              routine = r;
            }
        }
      });
      if (routine == null) {
        tryCounter++;
        if (tryCounter >= this.rtnsSeqSorted.length) {
          return routine;
        } else {
          return this.findCurrentRoutine(tryCounter, hoursBeforeDeadZone, hour);
        }
      }
      return routine;
    }

  private getScheduleUnitByRoutine(rt: IRoutine, hour: number): IScheduleUnit {
      return {
        data: {
          ID: rt.ID,
          name: rt.name,
          actionBody: rt.actionBody,
          actionType: rt.actionType,
          color: rt.colorScheme,
          describe: rt.describe,
          hours: rt.minDurationHours,
          start: hour,
          dayZone: rt.dayZone,
        },
        _type: ScheduleUnitType.Task,
      };
    }

  private isHourInDayZone(hour: number, dayZone: number): boolean {
    switch (dayZone) {
      case 1:
        if (hour < 8) {return true; }
      case 2:
        if (hour >= 8 && hour < 16) {return true; }
      case 3:
        if (hour >= 16 && hour < 24) {return true; }
      default:
      return false;
    }
  }

}

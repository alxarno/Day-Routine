import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { IRoutine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { IDeadZone } from "src/models/dead_zone";
import { INowTask } from "src/models/now.tasks";
import { RoutinesHoursPerWeekSpent,
   GetCoefficients,
   SortRoutinesByFinishingCoefficients } from "./schedule/schedule.methods";

function Copy(d: object): object {
  return {...d};
}

export class ScheduleCore extends CoreModule implements IScheduleCore {

  public async Get(): Promise<Array<INowTask | null>> {
    let cashShedule: any[] = [];
    if (this.cash) {
      cashShedule = this.cash.Get();
    }
    if (cashShedule.length !== 0) {
      return cashShedule;
    }
    if (!this.storage) {return []; }
    const routines: IRoutine[] = await this.storage.Routines().Get();
    const activities: IStatistics[] = await this.storage.Statistics().Get();
    let deadZones: IDeadZone[] = await this.storage.DeadZones().Get();
    // 0 is Sunday, but need 0 is Monday
    let day: number = new Date().getDay() - 1;
    if (day < 0) { day++; }

    deadZones = deadZones.filter((dz: IDeadZone) => {
      if (!dz.enable) { return false; }
      if (dz.disabled_days.indexOf(day) !== -1) { return false; }
      return true;
    });

    if (activities.length === 0 && routines.length === 0) { return [...Array(24)].map(() => null); }
    const routineSpentWeek: {[key: number]: number} = RoutinesHoursPerWeekSpent(activities);
    const routineSpentWeekCopy: {[key: number]: number} = {...routineSpentWeek};

    let routineSpentWeekCoefficients: {[key: number]: number} =
       GetCoefficients(routines, Copy(routineSpentWeek) as {[key: number]: number});

    // Sorting routines by "finishing" coefficients
    let routinesSeqSorted: number[] =
       SortRoutinesByFinishingCoefficients(Copy(routineSpentWeekCoefficients) as {[key: number]: number});
    const finalSchedule: Array<INowTask | null> = [];

    const IsNowDeadZone = this.IsNowDeadZone;

    const func = (hour: number) => {
      if (IsNowDeadZone(deadZones, hour)) {
        finalSchedule.push(null);
        return;
      } else {

        let routine: IRoutine | null = null;
        routines.forEach((r: IRoutine) => {
          if (r == null) { return; }
          if (r.ID === routinesSeqSorted[0]) {
            routine = r;
          }
        });

      // routinesSeqSorted)

        if (routine == null) {finalSchedule.push(null); return; }
        const froutine: IRoutine = routine as IRoutine;
        finalSchedule.push({
          ID: froutine.ID,
          name: froutine.name,
          actionBody: froutine.actionBody,
          actionType: froutine.actionType,
          color: froutine.colorScheme,
          describe: froutine.describe,
          hours: 1,
          start: hour,
        });

        routineSpentWeekCopy[froutine.ID]++;
        routineSpentWeekCoefficients = GetCoefficients(routines, Copy(routineSpentWeekCopy) as {[key: number]: number});
        // Rebuild
        routinesSeqSorted =
           SortRoutinesByFinishingCoefficients(Copy(routineSpentWeekCoefficients) as {[key: number]: number});
      }
    };

    Array.from({length: 24}, (x, i) => i).forEach(func);
    if (this.cash) {
      this.cash.Set(finalSchedule);
    }
    return finalSchedule;
  }

  private IsNowDeadZone(dzs: IDeadZone[], hour: number): boolean {
    let fin: boolean = false;

    dzs.forEach((dz: IDeadZone) => {
      if (fin) { return; }
      if (dz.start > dz.done) {
        if (hour >= dz.start || hour < dz.done) { fin = true; }
      } else {
        if (hour >= dz.start && hour < dz.done) { fin = true; }
      }
    });

    return fin;
  }
}

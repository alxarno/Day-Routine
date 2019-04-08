import IStatistics from "src/models/statistics";
import { IRoutine } from "src/models/routines.routine";

export function RoutinesHoursPerWeekSpent(activities: IStatistics[]): {[key: number]: number} {
  const routineSpentWeek: {[key: number]: number} = {};

  // Get count of hours was spented for last week
  activities.forEach((e: IStatistics) => {
    routineSpentWeek[e.routineID] =
      e.spent.reduce((sum: number, current: number) => sum + current, 0);
  });

  return routineSpentWeek;
}

export function GetCoefficients(
  routines: IRoutine[],
  routinesSpentHoursPerWeek: {[key: number]: number}): {[key: number]: number} {

  routines.forEach((e: IRoutine) => {
    if (routinesSpentHoursPerWeek.hasOwnProperty(e.ID)) {
      // console.log("+++++++++++++++++");
      // console.log(routinesSpentHoursPerWeek[e.ID], e.hours, e.ID);
      // console.log("+++++++++++++++++");
      if (routinesSpentHoursPerWeek[e.ID] > e.hours) {
        routinesSpentHoursPerWeek[e.ID] = routinesSpentHoursPerWeek[e.ID] - e.hours;
        return;
      }
      // console.log(routinesSpentHoursPerWeek[e.ID]/e.hours)
      // console.log(routinesSpentHoursPerWeek[e.ID],e.hours, e.ID)
      routinesSpentHoursPerWeek[e.ID] = routinesSpentHoursPerWeek[e.ID] / e.hours;
      // console.log(routinesSpentHoursPerWeek[e.ID])
    }
  });

  return routinesSpentHoursPerWeek;
}

export function SortRoutinesByFinishingCoefficients(
  routineSpentWeekCoeff: {[key: number]: number}):
  number[] {
    const routinesSeqSorted: number[]  = [...Object.keys(routineSpentWeekCoeff).map((e: any) => Number(e))];
    // routinesSeqSorted.sort((a,b)=>b-a)
    routinesSeqSorted.sort((a, b) => {
      return routineSpentWeekCoeff[a] - routineSpentWeekCoeff[b];
    });
  // Object.keys(routineSpentWeekCoeff).forEach((v:any)=>{
  //   v = Number(v)
  //   // if(routinesSeqSorted.length==0) {routinesSeqSorted.push(v); return}
  //   if(routineSpentWeekCoeff[v]>=routinesSeqSorted[routinesSeqSorted.length-1]){
  //     routinesSeqSorted.push(v)
  //   }else{
  //     routinesSeqSorted = [v,...routinesSeqSorted]
  //   }
  // })

    return routinesSeqSorted;
}

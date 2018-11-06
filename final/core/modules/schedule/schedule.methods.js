export function RoutinesHoursPerWeekSpent(activities) {
    let routineSpentWeek = {};
    // Get count of hours was spented for last week
    activities.forEach((e) => {
        routineSpentWeek[e.routineID] =
            e.spent.reduce((sum, current) => sum + current, 0);
    });
    return routineSpentWeek;
}
export function GetCoefficients(routines, routinesSpentHoursPerWeek) {
    // console.log("++++++++++")
    // console.log("SPENT")
    // Object.keys(routinesSpentHoursPerWeek).forEach((k)=>console.log(k, routinesSpentHoursPerWeek[k]))
    // console.log("++++++++++")
    routines.forEach((e) => {
        // console.log(e)
        if (routinesSpentHoursPerWeek.hasOwnProperty(e.ID)) {
            // console.log("+++++++++++++++++")
            // console.log(routinesSpentHoursPerWeek[e.ID], e.hours,e.ID)
            // console.log("+++++++++++++++++")
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
export function SortRoutinesByFinishingCoefficients(routineSpentWeekCoeff) {
    let routinesSeqSorted = [...Object.keys(routineSpentWeekCoeff).map((e) => Number(e))];
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
//# sourceMappingURL=schedule.methods.js.map
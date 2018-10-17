import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { Routine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { DeadZone } from "src/models/dead_zone";
import { NowTask } from "src/models/now.tasks";
import { RoutinesHoursPerWeekSpent,
   GetCoefficients,
   SortRoutinesByFinishingCoefficients } from "./schedule/schedule.methods";

function Copy(d:Object):Object{
  return Object.assign({},d)
}

export class ScheduleCore extends CoreModule implements IScheduleCore{

  private IsNowDeadZone(dzs:Array<DeadZone>, hour:number):boolean{
    let fin:boolean = false

    dzs.forEach(( dz:DeadZone)=>{
      if(fin) return;
      if(dz.start>dz.done){
        if(hour>=dz.start || hour<dz.done) fin=true 
      }else{
        if(hour>=dz.start && hour<dz.done) fin=true
      }
    })

    return fin
  }

  public async Get(){
    let routines:Array<Routine> = await this.storage.Routines().Get()
    let activities:Array<IStatistics> = await this.storage.Statistics().Get();
    let deadZones:Array<DeadZone> = await this.storage.DeadZones().Get();

    if(activities.length==0) throw "Activityes is empty";

    let routineSpentWeek:{[key:number]:number}= RoutinesHoursPerWeekSpent(activities);
    let routineSpentWeekCopy:{[key:number]:number} = Object.assign({},routineSpentWeek)

    let routineSpentWeekCoefficients:{[key:number]:number} = GetCoefficients(routines, <{[key:number]:number}>Copy(routineSpentWeek))

    // Sorting routines by "finishing" coefficients
    let routinesSeqSorted:Array<number> = SortRoutinesByFinishingCoefficients(<{[key:number]:number}>Copy(routineSpentWeekCoefficients))

    let finalSchedule:Array<NowTask|null> = []

    let func = function(hour:number){
      if(this.IsNowDeadZone(deadZones, hour)){
        finalSchedule.push(null)
        return
      }else{ 
        
        let routine: Routine|null= null;
        routines.forEach((r:Routine)=>{
          if(routine!=null) return
          if(r.ID == routinesSeqSorted[0]){
            routine = r
          }
        })

        if(routine === null) {finalSchedule.push(null); return;}
        let froutine:Routine = <Routine>routine
        finalSchedule.push({
          name: froutine.name,
          actionBody:froutine.actionBody,
          actionType:froutine.actionType,
          color:froutine.colorScheme,
          describe:froutine.describe,
          hours:1,
          start:hour
        })
        
        // console.log("Routines, ",routines)
        routineSpentWeekCopy[froutine.ID]++;
        routineSpentWeekCoefficients = GetCoefficients(routines,<{[key:number]:number}>Copy(routineSpentWeekCopy))
        // console.log("Spent, ",routineSpentWeekCopy)
        // console.log("Coeffs, ",routineSpentWeekCoefficients)
        // Rebuild 
        routinesSeqSorted = SortRoutinesByFinishingCoefficients(<{[key:number]:number}>Copy(routineSpentWeekCoefficients))

        // // console.log("Coeffs, ",routineSpentWeekCoefficients)
        // console.log("Sorted, ",routinesSeqSorted)
        
        // console.log("-------------------")
      }
    }.bind(this)

    Array.from({length: 24}, (x,i) => i).forEach(func)
    

    





    

    // console.log(routineSpentWeek)
    // console.log(routinesSeqSorted)

    // console.log(routines)
    // console.log("DeadZones Hours ", deadZoneHours)
    // console.log("Spent, ",routineSpentWeekCopy)
    console.log(finalSchedule)
  }

  // public Import(){

  // }

  // public Delete(){

  // }

  // public Export(){
    
  // }
}
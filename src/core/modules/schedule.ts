import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { Routine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { DeadZone } from "src/models/dead_zone";
import { NowTask } from "src/models/now.tasks";
import { RoutinesHoursPerWeekSpent,
   GetCoefficients,
   SortRoutinesByFinishingCoefficients } from "./schedule/schedule.methods";
import { ICash } from "src/interfaces/cash";

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

  public async Get():Promise<Array<NowTask|null>>{
    let cashShedule:string = this.cash.Get()
    if(cashShedule == "{}") {
      this.cash.Clear()
    }else{
      console.log("Cash Used")
      return JSON.parse(cashShedule)
    }

    let routines:Array<Routine> = await this.storage.Routines().Get()
    let activities:Array<IStatistics> = await this.storage.Statistics().Get();
    let deadZones:Array<DeadZone> = await this.storage.DeadZones().Get();
    

    if(activities.length==0 && routines.length == 0) return [...Array(24)].map(()=>null);
    let routineSpentWeek:{[key:number]:number}= RoutinesHoursPerWeekSpent(activities);
    let routineSpentWeekCopy:{[key:number]:number} = Object.assign({},routineSpentWeek)

    let routineSpentWeekCoefficients:{[key:number]:number} = GetCoefficients(routines, <{[key:number]:number}>Copy(routineSpentWeek))

    // Sorting routines by "finishing" coefficients
    let routinesSeqSorted:Array<number> = SortRoutinesByFinishingCoefficients(<{[key:number]:number}>Copy(routineSpentWeekCoefficients))
    // console.log(routinesSeqSorted)
    let finalSchedule:Array<NowTask|null> = []
    
    let IsNowDeadZone = this.IsNowDeadZone

    let func = function(hour:number){
      // console.log(IsNowDeadZone(deadZones, hour))
      if(IsNowDeadZone(deadZones, hour)){
        finalSchedule.push(null)
        return
      }else{ 
        
        let routine: Routine|null= null;
        routines.forEach((r:Routine)=>{
          if(r==null) return
          if(r.ID == routinesSeqSorted[0]){
            routine = r
          }
        })

      // routinesSeqSorted)
        
        if(routine == null) {finalSchedule.push(null); return;}
        let froutine:Routine = <Routine>routine
        finalSchedule.push({
          ID:froutine.ID,
          name: froutine.name,
          actionBody:froutine.actionBody,
          actionType:froutine.actionType,
          color:froutine.colorScheme,
          describe:froutine.describe,
          hours:1,
          start:hour
        })
        
 
        routineSpentWeekCopy[froutine.ID]++;
        routineSpentWeekCoefficients = GetCoefficients(routines,<{[key:number]:number}>Copy(routineSpentWeekCopy))
        // console.log(routineSpentWeekCoefficients)
        // Rebuild 
        routinesSeqSorted = SortRoutinesByFinishingCoefficients(<{[key:number]:number}>Copy(routineSpentWeekCoefficients))
        // console.log(routinesSeqSorted)
      }
    }.bind(this)

    Array.from({length: 24}, (x,i) => i).forEach(func)

    this.cash.Set(JSON.stringify(finalSchedule))

    return finalSchedule
  }
}
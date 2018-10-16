import CoreModule from "./module";
import { IScheduleCore } from "src/interfaces/core";
import { Routine } from "src/models/routines.routine";
import IStatistics from "src/models/statistics";
import { DeadZone } from "src/models/dead_zone";
import { NowTask } from "src/models/now.tasks";

export class ScheduleCore extends CoreModule implements IScheduleCore{

  private IsNowDeadZone(dzs:Array<DeadZone>, hour:number):boolean{
    let fin:boolean = false

    dzs.forEach(( dz:DeadZone)=>{
      if(fin) return;
      if(dz.start>dz.done){
        if(hour<dz.start || hour>=dz.done) fin=true 
      }else{
        if(hour>=dz.start || hour<dz.done) fin=true
      }
    })

    return fin
  }

  public async Get(){
    let routines:Array<Routine> = await this.storage.Routines().Get()
    let activities:Array<IStatistics> = await this.storage.Statistics().Get();
    let deadZones:Array<DeadZone> = await this.storage.DeadZones().Get();

    if(activities.length==0) throw "Activityes is empty";

    let routineSpentWeek:{[key:number]:number}= {};

    // Get count of hours was spented for last week
    activities.forEach((e:IStatistics)=>{
      routineSpentWeek[e.routineID] = 
        e.spent.reduce((sum:number, current:number)=>sum+current, 0)
    })

    // Get "finishing" coefficients
    routines.forEach((e:Routine)=>{
      if(routineSpentWeek.hasOwnProperty(e.ID)){
        routineSpentWeek[e.ID] /= (e.hours==0?0.1:e.hours);
      }
    })

    // Sorting routines by "finishing" coefficients
    let routinesSeqSorted:Array<number> = [] 
    Object.keys(routineSpentWeek).forEach((v:any)=>{
      v = Number(v)
      if(routinesSeqSorted.length==0) {routinesSeqSorted.push(v); return}
      if(routineSpentWeek[v]>=routinesSeqSorted[routinesSeqSorted.length-1]){
        routinesSeqSorted.push(v)
      }else{
        routinesSeqSorted = [v,...routinesSeqSorted]
      }
    })

    let finalSchedule:Array<NowTask|null> = []

    Array.from({length: 24}, (x,i) => i).forEach((hour:number)=>{
      if(this.IsNowDeadZone(deadZones, hour)){
        finalSchedule.push(null)
        return
      }else{
        // CONTINUE THERE 
      }

    }.bind(this))
    





    

    console.log(routineSpentWeek)
    console.log(routinesSeqSorted)

    // console.log(routines)
    // console.log(activities)
    console.log(deadZones)
  }

  // public Import(){

  // }

  // public Delete(){

  // }

  // public Export(){
    
  // }
}
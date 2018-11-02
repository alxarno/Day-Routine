import {IStorage} from "src/interfaces/storage"

import {
  ICore,
  IScheduleCore,
  ISettingsCore,
  IRoutinesCore,
  IDeadZonesCore
} from 'src/interfaces/core'

import {ICash} from 'src/interfaces/cash'

import {ScheduleCore} from './modules/schedule'
import {SettingsCore} from "./modules/settings";
import { IOS } from "src/interfaces/os";
import { OS } from "src/os";
import Task from "src/view/components/now/task/task";
import { NowTask } from "src/models/now.tasks";

export class Core implements ICore{
  private Storage:IStorage
  private Cash:ICash

  private ScheduleModule:IScheduleCore
  private SettingsModule:ISettingsCore
  private os:IOS

  constructor(storage: IStorage, cash:ICash) {
    this.Storage = storage;
    this.Cash = cash

    this.ScheduleModule = new ScheduleCore({storage:this.Storage, cash:this.Cash})
    this.SettingsModule = new SettingsCore({storage:this.Storage})
    this.os = new OS(this, this.HourIsGone)
  }

  // private Cash

  public HourIsGone(newHour:number){
    // console.log("Hour is gone")
    let schedule:Array<NowTask|null> = JSON.parse(this.Cash.Get())
    let lastTask:NowTask|null = null
    if(newHour==0){
      if(schedule[23]){
        lastTask = (schedule[23] as NowTask)
      }
    }else{
      if(schedule[newHour-1]){
        lastTask = (schedule[newHour-1] as NowTask)
      }
    }
    if(lastTask) this.Storage.Statistics().Add({hours:1, routineID: lastTask.ID})

  }

  public Routines():IRoutinesCore{
    return this.Storage.Routines()
  }

  public DeadZones():IDeadZonesCore{
    return this.Storage.DeadZones()
  }

  public Schedule():IScheduleCore{
    return this.ScheduleModule
  }

  public Settings():ISettingsCore{
    return this.SettingsModule
  }
}
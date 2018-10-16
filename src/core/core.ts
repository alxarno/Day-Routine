import {IStorage} from "src/interfaces/storage"

import {
  ICore,
  IScheduleCore,
  ISettingsCore,
  IRoutinesCore,
  IDeadZonesCore
} from 'src/interfaces/core'


import {ScheduleCore} from './modules/schedule'
import {SettingsCore} from "./modules/settings";

export class Core implements ICore{
  private Storage:IStorage
  private ScheduleModule:IScheduleCore
  private SettingsModule:ISettingsCore

  constructor(storage: IStorage) {
    this.Storage = storage;

    this.ScheduleModule = new ScheduleCore(this.Storage)
    this.SettingsModule = new SettingsCore(this.Storage)
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
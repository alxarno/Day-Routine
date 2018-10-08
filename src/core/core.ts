import IStorage from "src/interfaces/storage"

import {IScheduleCore} from './interfaces'
import {IDeadZoneCore} from './interfaces'
import {IRoutinesCore} from './interfaces'

import {ScheduleCore} from './modules/schedule'
import {DeadZonesCore} from './modules/dead_zones'
import {RoutinesCore} from './modules/routines'

class Core {
  private Storage:IStorage
  private ScheduleModule:IScheduleCore
  private RoutinesModule:IRoutinesCore
  private DeadZonesModule:IDeadZoneCore

  constructor(storage: IStorage) {
    this.Storage = storage;

    this.ScheduleModule = new ScheduleCore()
    this.RoutinesModule = new RoutinesCore()
    this.DeadZonesModule = new DeadZonesCore()
  }

  public Routines():IRoutinesCore{
    return this.RoutinesModule
  }

  public DeadZones():IDeadZoneCore{
    return this.DeadZonesModule
  }

  public Schedule():IScheduleCore{
    return this.ScheduleModule
  }
}
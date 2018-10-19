import {
  IStorage,
  IRoutinesStorage,
  IStatisticsStorage,
  IDeadZonesStorage
 } from '../interfaces/storage'

import {
  IStorageKernel
} from '../interfaces/storageKernel'

import {
  RoutinesSchema,
  DeadZoneSchema,
  StatisticsSchema
} from './schemas'

import {Routines} from './modules/routines'
import {DeadZones} from './modules/dead_zones'
import {Statistics} from './modules/statistics'

export class Storage implements IStorage{

  private kernel:IStorageKernel

  private statistics:IStatisticsStorage
  private routines:IRoutinesStorage
  private deadZones:IDeadZonesStorage


  constructor(kernel:IStorageKernel){
    this.kernel = kernel
    
    this.statistics = new Statistics(this.kernel, StatisticsSchema)
    this.routines = new Routines(this.kernel, RoutinesSchema,
          this.statistics.Add.bind(this.statistics),
          this.statistics.Delete.bind(this.statistics))
    this.deadZones= new DeadZones(this.kernel, DeadZoneSchema)
  }

  Statistics():IStatisticsStorage{
    return this.statistics
  }

  Routines():IRoutinesStorage{
    return this.routines
  }

  DeadZones():IDeadZonesStorage{
    return this.deadZones
  }

  
  
  
  
}
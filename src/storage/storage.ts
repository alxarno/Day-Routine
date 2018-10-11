import {
  IStorage,
  IRoutinesStorage,
  IStatisticsStorage,
  IDeadZonesStorage
 } from '../interfaces/storage'

import {
  IStorageKernel
} from '../interfaces/storageKernel'

import Schemas from './schemas'
// import {Schema} from './interfaces'

import {Routines} from './modules/routines'
import {DeadZones} from './modules/dead_zones'
import {Statistics} from './modules/statistics'

export class Storage implements IStorage{

  private kernel:IStorageKernel
  private schemas:Array<StorageSchema.ISchema> = Schemas

  private statistics:IStatisticsStorage
  private routines:IRoutinesStorage
  private deadZones:IDeadZonesStorage


  constructor(kernel:IStorageKernel){
    this.kernel = kernel
    
    this.statistics = new Statistics(this.kernel)
    this.routines = new Routines(this.kernel)
    this.deadZones= new DeadZones(this.kernel)

    this.CheckSchemas()
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

  // Private

  private async CheckSchemas(){
    for(let i=0;i<this.schemas.length;i++){
      this.schemas[i].transpilerToPrimitive()
      // for(let field in this.schemas[i].schema){
      //   this.schemas[i].schema[field] = this.schemas[i].schema[field].SchemaNativeType()
      // }
      // this.schemas[i].schema = 
    //   await this.kernel.Table().Create(
    //     this.schemas[i].name,
    //     this.schemas[i].schema)
    }
  }
  
  
  
}
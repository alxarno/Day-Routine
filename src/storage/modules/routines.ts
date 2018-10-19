import {IRoutinesStorage, IStatisticsStorage} from '../../interfaces/storage'
import {IStorageKernel, ICRUD} from '../../interfaces/storageKernel'

import {Routine} from 'src/models/routines.routine'

import StorageModule from './module'
import IStatistics from 'src/models/statistics';

export class Routines extends StorageModule implements IRoutinesStorage {

  private addToStatics:Function;
  private deleteFromStatics:Function;

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema,
      addToStatics:Function,
      deleteFromStatics:Function){
    super(kernel,schema)
    this.addToStatics = addToStatics
    this.deleteFromStatics = deleteFromStatics
  }

  async Get(){
    let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get()
    if(Object.keys(rows).length==0) return [];
    let crows:Array<any> = Object.keys(rows).map((v,i) => rows[i]);
    let units:Array<Routine> = crows.map((el:Routines)=>this.schema.Deserialization(el))
    return units
  }

  async Create(unit:Routine){
    let dunit = this.schema.Serialization(unit)
    // console.log(dunit)
    let id:number = await this.kernel.Table().GetByName(this.schema.name).Insert(dunit)
    // console.log(id)
    await this.addToStatics({routineID:id, hours:0})
  }

  async Delete(unit:any){
    let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get(unit)
    if(Object.keys(rows).length==0) return;
    console.log(rows)
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    // this.kernel.Table().GetByName(this.schema.name).Delete(unit)
  }

  Update(unit:Routine){
    this.kernel.Table().GetByName(this.schema.name).Update(unit)
  }
}
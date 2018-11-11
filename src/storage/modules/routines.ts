import {IRoutinesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import {Routine} from 'src/models/routines.routine'

import StorageModule from './module'

export class Routines extends StorageModule<Routine> implements IRoutinesStorage {

  private addToStatics:Function;
  private deleteFromStatics:Function;

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema,
      addToStatics:Function,
      deleteFromStatics:Function,
      changeCallback:Function){
    super(kernel,schema, changeCallback)
    this.addToStatics = addToStatics
    this.deleteFromStatics = deleteFromStatics
  }


  async Create(unit:Routine){
    let dunit = this.schema.Serialization(unit)
    let id:number = await this.kernel.Insert(this.schema.name, dunit)
    await this.addToStatics({routineID:id, hours:0})
    this.changeCallback()
  }

  async Delete(unit:any){
    // let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get(unit)
    // if(Object.keys(rows).length==0) return;
    // console.log(rows)
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    this.deleteFromStatics(unit)
    this.kernel.Delete(this.schema.name, unit) 
    this.changeCallback()
  }
}
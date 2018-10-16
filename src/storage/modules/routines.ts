import {IRoutinesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import {Routine} from 'src/models/routines.routine'

import StorageModule from './module'

export class Routines extends StorageModule implements IRoutinesStorage {

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema){
    super(kernel,schema)
  }

  async Get(){
    let rows = await this.kernel.Table().GetByName(this.schema.name).Get()
    let units:Array<Routine> = rows.map((el:Routines)=>this.schema.Deserialization(el))
    return units
  }

  Create(unit:Routine){
    let dunit = this.schema.Serialization(unit)
    this.kernel.Table().GetByName(this.schema.name).Insert(dunit)
  }

  Delete(unit:any){
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    this.kernel.Table().GetByName(this.schema.name).Delete(unit)
  }

  Update(unit:Routine){
    this.kernel.Table().GetByName(this.schema.name).Update(unit)
  }
}
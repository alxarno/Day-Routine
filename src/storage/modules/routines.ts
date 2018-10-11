import {IRoutinesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import {Routine} from 'src/models/routines.routine'

import StorageModule from './module'

export class Routines extends StorageModule implements IRoutinesStorage {

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema){
    super(kernel,schema)
  }

  async Get(){
    
  }

  async Create(unit:Routine){
    let dunit = this.schema.Serialization(unit)
    await this.kernel.Table()
      .Get(this.schema.name)
      .then((table)=>{
        table.Insert(dunit)
      })
  }

  async Delete(unit:any){
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    await this.kernel.Table()
      .Get(this.schema.name)
      .then((table)=>{
        table.Delete(unit)
      })
  }

  async Update(){

  }
}
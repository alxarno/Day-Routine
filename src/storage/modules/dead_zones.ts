import {IDeadZonesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import StorageModule from './module'
import { DeadZone } from 'src/models/dead_zone';

export class DeadZones extends StorageModule  implements IDeadZonesStorage {

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema){
    super(kernel,schema)
  }

  async Get(){
    let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get()
    if(Object.keys(rows).length==0) return [];
    let crows:Array<any> = Object.keys(rows).map((v,i) => rows[i]);
    let units:Array<DeadZone> = crows.map((el:DeadZone)=>this.schema.Deserialization(el))
    return units
  }

  Create(unit:DeadZone){
    let dunit = this.schema.Serialization(unit)
    this.kernel.Table().GetByName(this.schema.name).Insert(dunit)
  }

  Delete(unit:any){
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    this.kernel.Table().GetByName(this.schema.name).Delete(unit)
  }

  Update(unit:DeadZone){
    this.kernel.Table().GetByName(this.schema.name).Update(unit)
  }
}
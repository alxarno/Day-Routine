import {IDeadZonesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import StorageModule from './module'

export class DeadZones extends StorageModule  implements IDeadZonesStorage {

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema){
    super(kernel,schema)
  }

  async Get(){

  }

  async Create(){

  }

  async Delete(){

  }

  async Update(){

  }
}
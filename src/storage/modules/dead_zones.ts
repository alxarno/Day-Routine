import {IDeadZonesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

export class DeadZones implements IDeadZonesStorage {
  kernel:IStorageKernel

  constructor(kernel:IStorageKernel){
    this.kernel = kernel
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
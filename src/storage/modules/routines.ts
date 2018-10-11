import {IRoutinesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

export class Routines implements IRoutinesStorage {
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
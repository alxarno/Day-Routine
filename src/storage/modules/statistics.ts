import {IStatisticsStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'
import {NowTask} from '../../models/now.tasks'

export class Statistics implements IStatisticsStorage {
  kernel:IStorageKernel
  schema:any

  constructor(kernel:IStorageKernel){
    this.kernel = kernel
  }

  async Add(data:Array<NowTask>){

  }

  async ClearSpoiled(){

  }

  async ClearAll(){

  }
}
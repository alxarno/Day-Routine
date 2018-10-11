import {Storage} from '../storage'
import {IStorageKernel} from '../../interfaces/storageKernel'
import {IStorage} from '../../interfaces/storage'

export function CreateStorage(kernel:IStorageKernel):IStorage{
  return new Storage(kernel)
}
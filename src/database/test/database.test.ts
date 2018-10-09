import {DataBase} from '../database'
import {IStorageKernel} from '../../interfaces/storageKernel'

export function CreateDB():IStorageKernel{
  return new DataBase()
}
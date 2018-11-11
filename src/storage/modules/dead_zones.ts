import {IDeadZonesStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'

import StorageModule from './module'
import { DeadZone } from 'src/models/dead_zone';

export class DeadZones extends StorageModule<DeadZone>  implements IDeadZonesStorage {

  constructor(kernel:IStorageKernel,
       schema:StorageSchema.ISchema,
       changeCallback:Function){
    super(kernel,schema, changeCallback)
  }
}
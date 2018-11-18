import {IDeadZonesStorage} from "../../interfaces/storage";
import {IStorageKernel} from "../../interfaces/storageKernel";

import StorageModule from "./module";
import { IDeadZone } from "src/models/dead_zone";

export class DeadZones extends StorageModule<IDeadZone>  implements IDeadZonesStorage {

  constructor(
       kernel: IStorageKernel,
       schema: StorageSchema.ISchema,
       changeCallback: () => void) {
    super(kernel, schema, changeCallback);
  }
}

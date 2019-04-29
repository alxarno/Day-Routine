import StorageModule from "./module";
import { ISyncDevicesStorage } from "src/interfaces/storage";
import { ISyncDevice } from "src/models/sync_device";
import { IStorageKernel } from "src/interfaces/storageKernel";

export class SyncDevices extends StorageModule<ISyncDevice>  implements ISyncDevicesStorage {

  constructor(
       kernel: IStorageKernel,
       schema: StorageSchema.ISchema,
       changeCallback: () => void) {
    super(kernel, schema, changeCallback);
  }
}

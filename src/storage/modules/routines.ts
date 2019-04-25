import {IRoutinesStorage} from "../../interfaces/storage";
import {IStorageKernel} from "../../interfaces/storageKernel";

import {IRoutine} from "src/models/routines.routine";

import StorageModule from "./module";

export class Routines extends StorageModule<IRoutine> implements IRoutinesStorage {

  private addToStatics: (body: any) => void;
  private deleteFromStatics: (body: any) => void;

  constructor(kernel: IStorageKernel, schema: StorageSchema.ISchema,
              addToStatics: (body: any) => void,
              deleteFromStatics: (body: any) => void,
              changeCallback: () => void) {
    super(kernel, schema, changeCallback);
    this.addToStatics = addToStatics;
    this.deleteFromStatics = deleteFromStatics;
  }

  public async Create(unit: IRoutine) {
    const dunit = this.schema.Serialization(unit);
    // console.log(dunit);
    const id: number = await this.kernel.Insert(this.schema.name, dunit);
    await this.addToStatics({routineID: id, hours: 0});
    this.changeCallback();
  }

  public async Delete(unit: any) {
    // let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get(unit)
    // if(Object.keys(rows).length==0) return;
    // console.log(rows)
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    this.deleteFromStatics(unit);
    this.kernel.Delete(this.schema.name, unit);
    this.changeCallback();
  }
}

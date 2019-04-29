import {IStorageKernel} from "../../interfaces/storageKernel";

export default abstract class StorageModule<T> {
  protected kernel: IStorageKernel;
  protected schema: StorageSchema.ISchema;
  protected changeCallback: () => void;

  constructor(
      kernel: IStorageKernel,
      schema: StorageSchema.ISchema,
      changeCallback: () => void) {

    this.kernel = kernel;
    this.schema = schema;
    this.changeCallback = changeCallback;

    this.tableCheck();
  }

  public async Get(): Promise<T[]> {
    const rows: {[key: number]: any} = await this.kernel.Get(this.schema.name);
    if (Object.keys(rows).length === 0) {return []; }
    const crows: any[] = Object.keys(rows).map((v, i: number) => rows[i]);
    const units: T[] = crows.map((el: T) => this.schema.Deserialization(el));
    return units;
  }

  public async Create(unit: T) {
    const dunit = this.schema.Serialization(unit);
    await this.kernel.Insert(this.schema.name, dunit);
    this.changeCallback();
  }

  public async Delete(unit: any) {
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
    await this.kernel.Delete(this.schema.name, unit);
    this.changeCallback();
  }

  public async Update(unit: T) {
    this.kernel.Update(this.schema.name, this.schema.Serialization(unit));
    this.changeCallback();
  }

  private async tableCheck() {
    await this.kernel.TableCreate(
      this.schema.name,
      this.schema.TranspilerToPrimitive());
  }
}

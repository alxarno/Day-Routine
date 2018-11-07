import {IStorageKernel} from '../../interfaces/storageKernel'

export default abstract class StorageModule{
  protected kernel:IStorageKernel
  protected schema:StorageSchema.ISchema 
  protected changeCallback:Function

  constructor(kernel:IStorageKernel,
      schema:StorageSchema.ISchema,
      changeCallback:Function){
        
    this.kernel = kernel
    this.schema = schema
    this.changeCallback = changeCallback

    this.tableCheck()
  }

  private async tableCheck(){
    await this.kernel.TableCreate(
      this.schema.name,
      this.schema.TranspilerToPrimitive())
  }
}
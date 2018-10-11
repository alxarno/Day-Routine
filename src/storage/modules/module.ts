import {IStorageKernel} from '../../interfaces/storageKernel'

export default abstract class StorageModule{
  protected kernel:IStorageKernel
  protected schema:StorageSchema.ISchema 

  constructor(kernel:IStorageKernel, schema:StorageSchema.ISchema){
    this.kernel = kernel
    this.schema = schema

    this.tableCheck()
  }

  private async tableCheck(){
    await this.kernel.Table().Create(this.schema.name,
      this.schema.TranspilerToPrimitive())
  }
}
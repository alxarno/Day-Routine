import {IStorageKernel} from '../../interfaces/storageKernel'

export default abstract class StorageModule<T>{
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

  async Get(){
    let rows:{[key:number]:any} = await this.kernel.Get(this.schema.name)
    if(Object.keys(rows).length==0) return [];
    let crows:Array<any> = Object.keys(rows).map((v,i) => rows[i]);
    let units:Array<T> = crows.map((el:T)=>this.schema.Deserialization(el))
    return units
  }

  async Create(unit:T){
    let dunit = this.schema.Serialization(unit)
    let id:number = await this.kernel.Insert(this.schema.name, dunit)
    //await this.addToStatics({routineID:id, hours:0})
    this.changeCallback()
  }

  async Delete(unit:any){
    // let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get(unit)
    // if(Object.keys(rows).length==0) return;
    // console.log(rows)
    // We don't use serialization cause serialization
    // doesn't process ID , but we need ID for delete
    // certain row
   // this.deleteFromStatics(unit)
    this.kernel.Delete(this.schema.name, unit) 
    this.changeCallback()
  }

  Update(unit:T){

    this.kernel.Update(this.schema.name, this.schema.Serialization(unit))
    this.changeCallback()
  }
}
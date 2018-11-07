import { IDataBase } from "src/interfaces/database";
import { IStorageKernel } from "src/interfaces/storageKernel";

export default class StorageKernel implements IStorageKernel{
  database:IDataBase

  constructor(_database:IDataBase){
    this.database = _database
  }

  public Get(table:string, data?:any){
    if(data) return this.database.Table().GetByName(table).Get(data)
    return this.database.Table().GetByName(table).Get()
  }

  public async Insert(table:string, data:any){
    return this.database.Table().GetByName(table).Insert(data)
  }

  public async Update(table:string, data:any){
    return this.database.Table().GetByName(table).Update(data)
  }
  
  public async Delete(table:string, data:any){
    return this.database.Table().GetByName(table).Delete(data)
  }

  public async TableCreate(name:string, schema:{[key:string]:Object}){
    return this.database.Table().Create(name, schema)
  }
}
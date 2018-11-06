import { IDB} from '../interfaces'

import {ITableMethods, ICRUD} from '../../interfaces/storageKernel'

import {Crud} from './CRUD'

import {Request} from './lib'

export class Table implements ITableMethods{

  private DB:IDB
  private debug:boolean

  constructor(DBConnection:IDB, debug:boolean) {
    this.DB = DBConnection
    this.debug = debug
  }

  private DecodeTableSchema(schema:{ [key:string]:any; }):string{
    let rowSQL = "ID INTEGER PRIMARY KEY ASC, "
    for(let field in schema){
      switch(schema[field]){
        case String:
          rowSQL+= field+" TEXT, "
          break;
        case Number:
          if(field=="ID"){
            // Already defined
            break;
          }
          rowSQL+=field+" INTEGER, "

          break;
        case Boolean:
          rowSQL+=field+" INTEGER, "
          break;
        case Date:
          rowSQL+=field+" INTEGER, "
          break;
        default:
          throw "Failed decode schema. Type of "+field+" is wrong"
      }
    }
    // Cut last comma and space
    rowSQL = rowSQL.substring(0,rowSQL.length-2)
    return rowSQL
  }

  async Create(name:string, schema: any){
    let sqlBody = this.DecodeTableSchema(schema)
    sqlBody = "CREATE TABLE IF NOT EXISTS "+name+"("+sqlBody+")"
    // console.log(sqlBody)
    let promise = Request(sqlBody,[],this.DB)

    await promise;
    
    return new Crud(name,this.DB, this.debug)
  }

  async Drop(name:string){
    let sqlBody = "DROP TABLE "+name
    let promise = Request(
      sqlBody,
      [],
      this.DB)
    await promise;
  }

  GetByName(name:string):ICRUD{
    return new Crud(name,this.DB,  this.debug)
  }
}
import { IDB} from '../interfaces'

import {ITableMethods} from '../../interfaces/storageKernel'

import {Crud} from './CRUD'

import {Request} from './lib'

export class Table implements ITableMethods{

  private DB:IDB

  constructor(DBConnection:IDB) {
    this.DB = DBConnection
  }

  private DecodeTableSchema(schema:{ [key:string]:any; }):string{
    let rowSQL = "ID INTEGER PRIMARY KEY ASC, "
    for(let field in schema){
      switch(schema[field]){
        case String:
          rowSQL+= field+" TEXT, "
          break;
        case Number:
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
    let promise = Request(sqlBody,[],this.DB)

    await promise;
    
    return new Crud(name,this.DB)
  }

  Drop(){

  }

  async Get(name:string){
    let promise = Request(`SELECT name FROM sqlite_master
      WHERE type='table'
      ORDER BY name;`,
      [],this.DB)

    let data = null

    try{
      data = await promise;
    }catch(err){
      throw err
    }

    for(let i =0;i<data.rows.length;i++){
      if(data.rows[i].name == name){
        return new Crud(name,this.DB)
      }
    }

    throw "Table did'nt find"

  }
}
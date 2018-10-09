import {ICrudActions,IDB} from '../interfaces'

import {ICRUD} from '../../interfaces/storageKernel'

export class Crud implements ICRUD{
  private tableName:string
  private DB:IDB

  constructor(tableName: string, DBConnection:IDB){
    this.tableName = tableName
    this.DB = DBConnection
  }

  Get(){

  }

  Insert(){

  }

  Update(){
    
  }

  Delete(){

  }

}
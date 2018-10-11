import {IDB} from './interfaces'
import {IStorageKernel,ITableMethods} from '../interfaces/storageKernel'

import {Table} from './modules/tables'

export class DataBase implements IStorageKernel{

  private DB:IDB
  private TableHand:ITableMethods

  constructor(){
    this.DB = openDatabase("DayRoutine", "0.1", "", 2*1024*1024);
    if(!this.DB){
      throw "DB didn't open"
    }
    this.TableHand = new Table(this.DB)
  }

  public Table():ITableMethods{
    return this.TableHand
  }
}
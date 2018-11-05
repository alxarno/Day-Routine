import {IDB} from './interfaces'
import {IStorageKernel,ITableMethods, IPropsStorageKernel} from '../interfaces/storageKernel'

import {Table} from './modules/tables'

export class DataBase implements IStorageKernel{

  private DB:IDB
  private TableHand:ITableMethods

  constructor(props:IPropsStorageKernel, DBDriver:IDB){
    this.DB = DBDriver
    if(!this.DB){
      throw "DB didn't open"
    }
    this.TableHand = new Table(this.DB, props.debug)
  }

  public Table():ITableMethods{
    return this.TableHand
  }
}
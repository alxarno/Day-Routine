import {IDB} from './interfaces'
import {IDataBase,ITableMethods, IPropsDataBase} from '../interfaces/database'

import {Table} from './modules/tables'

export class DataBase implements IDataBase{

  private DB:IDB
  private TableHand:ITableMethods

  constructor(props:IPropsDataBase, DBDriver:IDB){
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
// import {IStorageKernel} from '../interfaces/storageKernel'

// Interfaces
import {IDB} from './interfaces'
import {IStorageKernel,ITableMethods} from '../interfaces/storageKernel'

import {Table} from './modules/tables'

// LocalStorage in Chromium is simple key-value store. 
// Therefore, we need some structure.

// First(0) key in LocalStorage is meta-information 
// about "tables". Every table have "name"- key for 
// gain. 

// LocalStorage values have length limit. Therefore, we use LZW 
// algorithm for length reduce
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

  
  
  // CreateTable(name:string, schema:object){
    

  //   let promise = new Promise((resolve, reject) => {
      
  //   });
  // }

  // Delete(){
  //   return {nine: String}
  // }

 
}
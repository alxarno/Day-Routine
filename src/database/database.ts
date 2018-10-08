import {IStorageKernel} from '../interfaces/storageKernel'

// Interfaces
import {ITableMeta} from './interfaces'

// LocalStorage in Chromium is simple key-value store. 
// Therefore, we need some structure.

// First(0) key in LocalStorage is meta-information 
// about "tables". Every table have "name"- key for 
// gain. 

// LocalStorage values have length limit. Therefore, we use LZW 
// algorithm for length reduce
export class DataBase implements IStorageKernel{

  DB:any

  constructor(){
    this.DB = openDatabase("DayRoutine", "0.1", "", 2*1024*1024);
    if(!this.DB){
      throw "DB didn't open"
    }
  }
  
  CreateTable(name:string, schema:object){
    

    let promise = new Promise((resolve, reject) => {

    });
  }

  Delete(){
    return {nine: String}
  }

  DropTable(){

  }

  Get(tableName:string, body: Object){

  }

  Insert(){

  }

  Update(){

  }
}
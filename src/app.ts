import CreateView from './view/view'

import {CashLocalStorage} from './cash'
import { DataBase as WebSQLDB} from './database';
import { Storage } from './storage';
import { Core } from './core';
import { ICash } from './interfaces/cash';
import { IStorage } from './interfaces/storage';
import { IStorageKernel } from './interfaces/storageKernel';
import StorageKernel from './storage_kernel';


let db:WebSQLDB = new WebSQLDB(
  {debug:false},
  openDatabase("DayRoutine", "0.1", "", 2*1024*1024))

let sk:IStorageKernel = new StorageKernel(db)
let cash:ICash = 	new CashLocalStorage()

let storage:IStorage = new Storage(sk, cash.Clear.bind(cash))

let core = new Core(storage,cash);
let UI = CreateView(core)


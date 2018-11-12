import CreateView from './view/view'

import {CashLocalStorage} from './cache'
import { DataBase as WebSQLDB} from './database';
import { Storage } from './storage';
import { Core } from './core';
import { ICache } from './interfaces/cache';
import { IStorage } from './interfaces/storage';
import { IStorageKernel } from './interfaces/storageKernel';
import StorageKernel from './storage_kernel';
import { OS } from './os';
import { IOS } from './interfaces/os';

let db:WebSQLDB = new WebSQLDB(
  {debug:false},
  openDatabase("DayRoutine", "0.1", "", 2*1024*1024))

let sk:IStorageKernel = new StorageKernel(db)
let cache:ICache = 	new CashLocalStorage()
let os:IOS = new OS({showNotifs:true})
let storage:IStorage = new Storage(sk, cache.Clear.bind(cache))

let core = new Core(storage,cache, os);
let UI = CreateView(core)


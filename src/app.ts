import CreateView from './view/view'
import {TEST} from './test'

import {CashLocalStorage} from './cash'
import { DataBase as WebSQLDB} from './database';
import { Storage } from './storage';
import { Core } from './core';
import { ICash } from './interfaces/cash';
import { IStorage } from './interfaces/storage';


// TEST()
let cash:ICash = 	new CashLocalStorage()
let storage:IStorage = new Storage(new WebSQLDB({debug:false}), cash.Clear.bind(cash))

let core = new Core(storage,cash);
let UI = CreateView(core)


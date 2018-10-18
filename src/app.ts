import CreateView from './view/view'
import {TEST} from './test'
import { DataBase } from './database/database';
import { Storage } from './storage/storage';
import { Core } from './core/core';


// TEST()
let database = new DataBase();
let storage = new Storage(database);
let core = new Core(storage);
let UI = CreateView(core)


import CreateView from './view/view';
import { CashLocalStorage } from './cash';
import { DataBase as WebSQLDB } from './database';
import { Storage } from './storage';
import { Core } from './core';
// TEST()
let db = new WebSQLDB({ debug: false }, openDatabase("DayRoutine", "0.1", "", 2 * 1024 * 1024));
let cash = new CashLocalStorage();
let storage = new Storage(db, cash.Clear.bind(cash));
let core = new Core(storage, cash);
let UI = CreateView(core);
//# sourceMappingURL=app.js.map
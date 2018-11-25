import CreateView from "./view/view";

import {CashLocalStorage} from "./cache";
import { DataBase as WebSQLDB} from "./database";
import { Storage } from "./storage";
import { Core } from "./core";
import { ICache } from "./interfaces/cache";
import { IStorage } from "./interfaces/storage";
import { IStorageKernel } from "./interfaces/storageKernel";
import StorageKernel from "./storage-kernel";
import { OS } from "./os";
import { IOS } from "./interfaces/os";
import { ISettingsStore } from "./interfaces/settingsStore";
import { SettingsStore } from "./settings-store";

const db: WebSQLDB = new WebSQLDB(
  {debug: false},
  openDatabase("DayRoutine", "0.1", "", 2 * 1024 * 1024));

const sk: IStorageKernel = new StorageKernel(db);
const cache: ICache = 	new CashLocalStorage();
const settingsStore: ISettingsStore = new SettingsStore();
const os: IOS = new OS({showNotifs: true});
const storage: IStorage = new Storage(sk, cache.Clear.bind(cache));

const core = new Core(storage, cache, os, settingsStore);
CreateView(core);

import CreateView from "./view/view";

import {CacheLocalStorage} from "./cache";
import { DataBase as WebSQLDB} from "./database";
import { Storage } from "./storage";
import { Core } from "./core";
import { ICache } from "./interfaces/cache";
import { IStorage } from "./interfaces/storage";
import { IStorageKernel } from "./interfaces/storageKernel";
import StorageKernel from "./storage/kernel";
import { OS } from "./os";
import { IOS } from "./interfaces/os";
import { ISettingsStore } from "./interfaces/settingsStore";
import { SettingsStore } from "./settings";
import Network from "./network";

const electron = (window as any).require("electron");
const {PROD} = electron.remote.getGlobal("CONFIG");

const DEBUG = !PROD;
const PORT = 22814;

const db: WebSQLDB = new WebSQLDB(
  {debug: DEBUG},
  openDatabase("DayRoutine", "0.1", "", 2 * 1024 * 1024));

const sk: IStorageKernel = new StorageKernel(db);
const cache: ICache = 	new CacheLocalStorage();
const settingsStore: ISettingsStore = new SettingsStore();
const os: IOS = new OS(settingsStore);
// const storage: IStorage = new Storage(sk, cache.Clear.bind(cache));
const storage: IStorage = new Storage(sk, () => {/**/});

const network = new Network(storage.SchemaVersion(), settingsStore.Get, DEBUG, PORT);
const core = new Core(storage, cache, os, settingsStore, network);
CreateView(core);

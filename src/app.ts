import UserInterface from "./view/view";

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
import { ICore } from "./interfaces/core";

const electron = (window as any).require("electron");
const {PROD} = electron.remote.getGlobal("CONFIG");

const DEBUG = !PROD;
const PORT = 40814;

const db: WebSQLDB = new WebSQLDB(
  {debug: DEBUG},
  openDatabase("DayRoutine", "0.1", "", 2 * 1024 * 1024)); // WEBSQL DATABASE

const sk: IStorageKernel = new StorageKernel(db); // TABLE's SCHEMAS
const cache: ICache = 	new CacheLocalStorage(); // LocalStorage
const settingsStore: ISettingsStore = new SettingsStore(); // Settings
const os: IOS = new OS(settingsStore); // Notifications and other
const storage: IStorage = new Storage(sk, () => {/**/}); // Manage tables as little ORM
const network = new Network(storage.SchemaVersion(), settingsStore.Get, DEBUG, PORT); // Work with network

const core = new Core(
  storage,
  cache,
  os,
  settingsStore,
  network,
  (core: ICore) => new UserInterface(core),
);
// const ui = new UserInterface(core);
// core.UI = ui;

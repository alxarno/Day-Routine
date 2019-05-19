import {
  IStorage,
  IRoutinesStorage,
  IStatisticsStorage,
  IDeadZonesStorage,
  ISyncDevicesStorage,
 } from "../interfaces/storage";

import {
  IStorageKernel,
} from "../interfaces/storageKernel";

import {
  RoutinesSchema,
  DeadZoneSchema,
  StatisticsSchema,
  SyncDevicesSchema,
} from "./schemas";

import {Routines} from "./modules/routines";
import {DeadZones} from "./modules/dead_zones";
import {Statistics} from "./modules/statistics";
import { SyncDevices } from "./modules/sync_devices";
import StorageModule from "./modules/module";
import IStatistics from "src/models/statistics";
import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import { ISyncDevice } from "src/models/sync_device";

export class Storage implements IStorage {
  public changeCallback: () => void;

  private kernel: IStorageKernel;
  private schemaVersion: string;

  private statistics: IStatisticsStorage;
  private routines: IRoutinesStorage;
  private deadZones: IDeadZonesStorage;
  private syncDevices: ISyncDevicesStorage;

  constructor(kernel: IStorageKernel, changeCallback: () => void) {
    this.schemaVersion = "2.1";
    this.kernel = kernel;
    this.changeCallback = changeCallback;

    this.statistics = new Statistics(this.kernel, StatisticsSchema, this.changeCallback);
    this.routines = new Routines(this.kernel, RoutinesSchema,
          this.statistics.Add.bind(this.statistics),
          this.statistics.Delete.bind(this.statistics),
          this.changeCallback);
    this.deadZones = new DeadZones(this.kernel, DeadZoneSchema, this.changeCallback);
    this.syncDevices = new SyncDevices(this.kernel, SyncDevicesSchema, this.changeCallback);
  }

  public Statistics(): IStatisticsStorage {
    return this.statistics;
  }

  public Routines(): IRoutinesStorage {
    return this.routines;
  }

  public DeadZones(): IDeadZonesStorage {
    return this.deadZones;
  }

  public SyncDevices(): ISyncDevicesStorage {
    return this.syncDevices;
  }

  public SchemaVersion(): string {
    return this.schemaVersion;
  }

  public async Init(): Promise<void> {
    await ((this.statistics as unknown) as StorageModule<IStatistics>).Init();
    await ((this.routines as unknown) as StorageModule<IRoutine>).Init();
    await ((this.deadZones as unknown) as StorageModule<IDeadZone>).Init();
    await ((this.syncDevices as unknown) as StorageModule<ISyncDevice>).Init();
    // const sp = new Promise(async (res, rej) => {
    //   await (; res(); });
    // const rp = new Promise(async (res, rej) => {
    //   await ((this.routines as unknown) as StorageModule<IRoutine>).Init(); res(); });
    // const dp = new Promise(async (res, rej) => {
    //   await ((this.deadZones as unknown) as StorageModule<IDeadZone>).Init(); res(); });
    // const sdp = new Promise(async (res, rej) => {
    //   await ((this.syncDevices as unknown) as StorageModule<ISyncDevice>).Init(); res(); });

    // await Promise.all([sp, rp, dp, sdp]);
  }

}

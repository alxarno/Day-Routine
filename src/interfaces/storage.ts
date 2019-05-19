import IStatistics from "src/models/statistics";
import { IDeadZone } from "src/models/dead_zone";
import { IRoutine } from "src/models/routines.routine";
import { ISyncDevice } from "src/models/sync_device";

export interface IDeadZonesStorage {
  Get: () => Promise<IDeadZone[]>;
  Create: (zone: IDeadZone) => void;
  Update: (unit: any) => Promise<void>;
  Delete: (unit: any) => Promise<void>;
}

export interface IStatisticsStorage {
  Add: (data: {routineID: number, hours: number}) =>  Promise<void>;
  Get: () => Promise< IStatistics[]>;
  ChangeSpent: (data: {routineID: number, spent: number[]}) => Promise< boolean>;
  Delete: (unit: any) => Promise<void>;
}

export interface IRoutinesStorage {
  Get: (args?: any) => Promise< IRoutine[]>;
  Create: (routine: IRoutine) => void;
  Delete: (unit: any) => Promise<void>;
  Update: (unit: any) => void;
}

export interface ISyncDevicesStorage {
  Get: () => Promise<ISyncDevice[]>;
  Create: (dev: ISyncDevice) => void;
  Update: (unit: any) => Promise<void>;
  Delete: (unit: any) => Promise<void>;
}

export interface IStorage {
  Statistics: () => IStatisticsStorage;
  Routines: () => IRoutinesStorage;
  DeadZones: () => IDeadZonesStorage;
  SyncDevices: () => ISyncDevicesStorage;
  changeCallback: () => void;
  SchemaVersion: () => string;
  Init: () => Promise<void>;
}

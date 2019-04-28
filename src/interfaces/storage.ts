import IStatistics from "src/models/statistics";
import { IDeadZone } from "src/models/dead_zone";
import { IRoutine } from "src/models/routines.routine";

export interface IDeadZonesStorage {
  Get: () => Promise<IDeadZone[]>;
  Create: (zone: IDeadZone) => void;
  Update: (unit: any) => Promise<void>;
  Delete: (unit: any) => Promise<void>;

  // Get: () => Promise< IRoutine | IRoutine[]>;
  // Create: (routine: IRoutine) => void;
  // Delete: (unit: any) => Promise<void>;
  // Update: (unit: IRoutine) => void;
}

export interface IStatisticsStorage {
  Add: (data: {routineID: number, hours: number}) => void;
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

export interface IStorage {
  Statistics: () => IStatisticsStorage;
  Routines: () => IRoutinesStorage;
  DeadZones: () => IDeadZonesStorage;
  changeCallback: () => void;
}

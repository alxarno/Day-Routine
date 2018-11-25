import {IRoutine} from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import { INowTask } from "src/models/now.tasks";
import { ISettings } from "./settingsStore";

export interface ISettingsCore {
  Import: () => void;
  Export: () => void;
  ClearAll: () => void;
  Get: () => ISettings;
  Put: (s: ISettings) => void;
}

export interface IScheduleCore {
  Get: () => Promise< Array<INowTask | null> >;
}

export interface IDeadZonesCore {
  Get: () => Promise< IDeadZone[]>;
  Create: (zone: IDeadZone) => void;
  Update: (unit: any) => Promise<void>;
  Delete: (unit: any) => Promise<void>;
  // Get: Function;
  // Create: Function;
  // Update: Function;
  // Delete: Function;
}

export interface IRoutinesCore {
  Get: () => Promise< IRoutine[]>;
  Create: (routine: IRoutine) => void;
  Delete: (unit: any) => Promise<void>;
  Update: (unit: IRoutine) => void;
  // Get: Function;
  // Create: Function;
  // Update: Function;
  // Delete: Function;
}

export interface ICore {
  Routines: () => IRoutinesCore;
  Schedule: () => IScheduleCore;
  DeadZones: () => IDeadZonesCore;
  Settings: () => ISettingsCore;
  FreeTime: () => Promise<number>;
}

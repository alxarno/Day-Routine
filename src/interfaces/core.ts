import {Routine} from "src/models/routines.routine";
import { DeadZone } from "src/models/dead_zone";
import { NowTask } from "src/models/now.tasks";

export interface ISettingsCore {
  Import: () => void;
  Export: () => void;
  ClearAll: () => void;
}

export interface IScheduleCore {
  Get: () => Promise< Array<NowTask | null> >;
}

export interface IDeadZonesCore {
  // Get: () => Promise< DeadZone | DeadZone[]> ;
  // Create: () => void;
  // Delete: () => void;
  // Update: () => void;
  Get: Function;
  Create: Function;
  Update: Function;
  Delete: Function;
}

export interface IRoutinesCore {
  // Get: () => Promise< Routine | Routine[]>;
  // Create: () => void;
  // Delete: () => void;
  // Update: () => void;
  Get: Function;
  Create: Function;
  Update: Function;
  Delete: Function;
}

export interface ICore {
  Routines: () => IRoutinesCore;
  Schedule: () => IScheduleCore;
  DeadZones: () => IDeadZonesCore;
  Settings: () => ISettingsCore;
  FreeTime: () => Promise<number>;
}

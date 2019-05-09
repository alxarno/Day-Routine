import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import IStatistics from "src/models/statistics";

export interface ISyncAnswer {
  data: ISyncData | null;
  error: Error;
}

export interface ISyncInitData {
  newDataRequest: (syncID: string) => void;
  newDataDistribution: (syncID: string) => void;
  getDataForTransmition: () => string;
  gotDataFromTransmition: (data: any, dbSchemaVersion: string) => void;
}

export interface ISyncData {
  routines: IRoutine[];
  deadZones: IDeadZone[];
  statistics: IStatistics[];
  dbSchemaVersion: string;
}

export interface ISync {
  Request: () => void;
  Broadcast: () => void;
  DismissRequest: (syncID: string) => void;
  AcceptRequest: (syncID: string) => void;
  Init: (data: ISyncInitData) => void;
  Start: () => Promise<boolean>;
  Close: () => void;
}

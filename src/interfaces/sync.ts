import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import IStatistics from "src/models/statistics";

export interface ISyncAnswer {
  data: ISyncData | null;
  error: Error;
}

export interface ISyncInitData {
  newDataRequest: (networkID: string) => void;
  newDataDistribution: (networkID: string) => void;
  getDataForTransmition: () => string;
  gotDataFromTransmition: (data: string) => void;
}

export interface ISyncData {
  routines: IRoutine[];
  deadZones: IDeadZone[];
  statistics: IStatistics[];
  dbSchemaVersion: string;
}

export interface ISync {
  Request: () => Promise<ISyncAnswer>;
  Broadcast: (d: ISyncData) => Promise<void>;
  DismissRequest: (networkID: string) => void;
  AcceptRequest: (networkID: string) => void;
  Init: (data: ISyncInitData) => void;
  Start: () => void;
  Close: () => void;
}

import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import IStatistics from "src/models/statistics";

export interface INetworkData {
  routines: IRoutine[];
  deadZones: IDeadZone[];
  statistics: IStatistics[];
  dbSchemaVersion: string;
}

export interface INetworkAnswer {
  data: INetwork | null;
  error: Error;
}

export interface INetwork {
  Request: () => Promise<INetworkAnswer>;
  Broadcast: (d: INetworkData) => Promise<void>;
}

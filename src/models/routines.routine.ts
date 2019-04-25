import {Action} from "./action";
import { DayZone } from "./dayzone";

export interface IRoutine {
  ID: number;
  name: string;
  colorScheme: string;
  describe: string;
  hours: number;
  actionBody: string;
  actionType: Action;
  hoursSpended: number[];
  minDurationHours: number;
  dayZone: DayZone;
}

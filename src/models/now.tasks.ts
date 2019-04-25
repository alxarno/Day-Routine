import {Action} from "./action";
import { DayZone } from "./dayzone";

export interface INowTask {
  ID: number;
  name: string;
  hours: number;
  describe: string;
  actionBody: string;
  actionType: Action;
  dayZone: DayZone;
  start: number;
  color: string;
}

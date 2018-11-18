import {Action} from "./action";

export interface INowTask {
  ID: number;
  name: string;
  hours: number;
  describe: string;
  actionBody: string;
  actionType: Action;
  start: number;
  color: string;
}

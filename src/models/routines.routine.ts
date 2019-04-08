import {Action} from "./action";

export interface IRoutine {
  ID: number;
  name: string;
  colorScheme: string;
  describe: string;
  hours: number;
  actionBody: string;
  actionType: Action;
  hoursSpended: number;
}

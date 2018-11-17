import {Action} from "./action";

export interface Routine {
  ID: number;
  name: string;
  colorScheme: string;
  describe: string;
  hours: number;
  actionBody: string;
  actionType: Action;
}

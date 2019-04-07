import { IRoutine } from "src/models/routines.routine";
import { INowTask } from "src/models/now.tasks";

export interface IOSSettings {
  Notifications: boolean;
}

export interface IOS {
  readFile: (path: string) => Promise<any>;
  writeFile: (path: string, data: string) => Promise<any>;
  chooseFile: () => Promise<any>;
  saveFile: () => Promise<string>;

  registerTimerCallbcak: (f: (newHour: number) => void) => void;
  registerGetCurrentTask: (func: () => Promise<INowTask | null>) => void;
  setSettings: (s: IOSSettings) => void;
}

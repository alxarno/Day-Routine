import { IRoutine } from "src/models/routines.routine";

export interface IOS {
  readFile: (path: string) => Promise<any>;
  writeFile: (path: string, data: string) => Promise<any>;
  chooseFile: () => Promise<any>;
  saveFile: () => Promise<string>;

  registerTimerCallbcak: (f: () => void) => void;
  registerGetCurrentTask: (func: () => IRoutine | null) => void;
}

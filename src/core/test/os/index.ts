import { IOS } from "src/interfaces/os";
import { IRoutine } from "src/models/routines.routine";
import { INowTask } from "src/models/now.tasks";
import { IScheduleUnit } from "src/models/schedule.unit";

interface IOSEmulProps {
  print: boolean;
  delay: number;
}

export interface ITestOS {
  Data: () => string;
  SetData: (data: string) => void;

  readFile: (path: string) => Promise<any>;
  writeFile: (path: string, data: string) => Promise<any>;
  chooseFile: () => Promise<any>;
  saveFile: () => Promise<string>;

  registerTimerCallbcak: (f: (newHour: number) => void) => void;
  registerGetCurrentTask: (func: () => Promise<IScheduleUnit>) => void;
}

export class OSEmul implements ITestOS {
  private testConfig: IOSEmulProps;
  private saveNameFile: string = "smth.json";
  private fileData: string = "";

  constructor(config: IOSEmulProps) {
    this.testConfig = config;
  }

  public registerTimerCallbcak(func: (newHour: number) => void) {
    //
  }

  public registerGetCurrentTask(func: () => Promise<IScheduleUnit>) {
    //
  }

  public Data(): string { return this.fileData; }

  public SetData(data: string) { this.fileData = data; }

  public async chooseFile() {
    if (this.testConfig.print) {console.log("OSEmul: ChooseFile has called"); }
    await new Promise((resolve) => setTimeout(resolve, this.testConfig.delay));
    return this.saveNameFile;
  }

  public async readFile() {
    if (this.testConfig.print) {console.log("OSEmul: readFile has called"); }
    await new Promise((resolve) => setTimeout(resolve, this.testConfig.delay));
    return this.fileData;
  }

  public async saveFile() {
    if (this.testConfig.print) {console.log("OSEmul: SaveFile has called"); }
    await new Promise((resolve) => setTimeout(resolve, this.testConfig.delay));
    return this.saveNameFile;
  }

  public async writeFile(path: string, data: string) {
    if (this.testConfig.print) { console.log("OSEmul: WriteFile has called. Args: ", arguments); }
    await new Promise((resolve) => setTimeout(resolve, this.testConfig.delay));

    if (path !== this.saveNameFile) { throw new Error("Cannot find file"); }
    this.fileData = data;
  }
}

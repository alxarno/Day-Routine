import { IOS } from "src/interfaces/os";
import { IStorage } from "src/interfaces/storage";
import { ICore } from "src/interfaces/core";
import { IRoutine } from "src/models/routines.routine";
import { Action } from "src/models/action";
// const notifier = window.require('node-notifier')
const Notif =  (window as any).require("electron").remote.require("./renderer").notifAction;
const OpenLink =  (window as any).require("electron").remote.require("./renderer").openLink;
const ExecFile =  (window as any).require("electron").remote.require("./renderer").executeFile;

const readFile =  (window as any).require("electron").
  remote.require("./renderer").openFile;

const writeFile =  (window as any).require("electron").
  remote.require("./renderer").writeToFile;

const saveFile =  (window as any).require("electron").
  remote.require("./renderer").saveFile;

const chooseFile = (window as any).require("electron").
  remote.require("./renderer").chooseFile;

interface IOSProps {
  showNotifs: boolean;
}

export class OS implements IOS {
  // private core:ICore
  private props: IOSProps;
  private nowTimeout: any;
  private firstCall: boolean;

  constructor(props: IOSProps) {
    // this.core = core
    this.props = props;
    this.firstCall = true;
    this.timerStart();
  }

  public registerTimerCallbcak(func: () => void) {
    this.timeOutCallback = func;
  }

  public registerGetCurrentTask(func: () => IRoutine | null) {
    this.getCurrentTask = func;
  }

  public saveFile() {
    return saveFile;
  }

  public chooseFile() {
    return chooseFile;
  }

  public readFile(path: string) {
    return readFile(path);
  }

  public writeFile(path: string, data: string) {
    return writeFile(path, data);
  }
  private timeOutCallback: (hours: number) => void = () => null;

  private getCurrentTask: () => IRoutine | null = () => null;

  private async timerStart() {
    const date: Date = new Date();

    this.nowTimeout = setTimeout(this.timerStart.bind(this),
      (60 - date.getMinutes()) * 60000);

    if (!this.getCurrentTask) { return; }

    const task: IRoutine | null = await this.getCurrentTask();
    if (!this.firstCall) {
      if (this.timeOutCallback) { this.timeOutCallback(date.getHours()); }
    } else {
      this.firstCall = false;
    }
    if (task != null) {
      if (this.props.showNotifs) { this.showNotification((task as IRoutine).name, (task as IRoutine).describe); }
      switch ((task as IRoutine).actionType) {
        case Action.File:
          ExecFile((task as IRoutine).actionBody);
          break;
        case Action.Link:
          OpenLink((task as IRoutine).actionBody);
          break;
      }
    }

  }

  private showNotification(t: string, m: string) {
    Notif(t, m);
  }

}

import { IOS, IOSSettings } from "src/interfaces/os";
import { Action } from "src/models/action";
import { ISettingsStore } from "src/interfaces/settingsStore";
import { INowTask } from "src/models/now.tasks";
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
  private settingsStore: ISettingsStore;
  private nowTimeout: any;
  private firstCall: boolean;
  private getCurrentTask: ((() => Promise<INowTask | null>) | null);

  constructor(settingsStore: ISettingsStore) {
    this.settingsStore = settingsStore;
    this.getCurrentTask = null;
    this.firstCall = true;
    this.timerStart();
  }

  public registerTimerCallbcak(func: (newHour: number) => void) {
    this.timeOutCallback = func;
  }

  public registerGetCurrentTask(func: () => Promise<INowTask | null>) {
    this.getCurrentTask = func;
  }

  public saveFile() {
    return saveFile();
  }

  public chooseFile() {
    return chooseFile();
  }

  public readFile(path: string) {
    return readFile(path);
  }

  // public setSettings(s: IOSSettings): void {
  //   // this.settings = s;
  // }

  public writeFile(path: string, data: string) {
    return writeFile(path, data);
  }
  private timeOutCallback: (hours: number) => void = () => null;

  private async timerStart() {
    const date: Date = new Date();

    this.nowTimeout = setTimeout(this.timerStart.bind(this),
      (60 - date.getMinutes()) * 60000);

    if (!this.getCurrentTask) { return; }

    const task: INowTask | null = await this.getCurrentTask();

    if (!this.firstCall) {
      if (this.timeOutCallback) { this.timeOutCallback(date.getHours()); }
    } else {
      this.firstCall = false;
    }
    if (task != null) {
        this.showNotification((task as INowTask).name, (task as INowTask).describe);
        this.execAction((task as INowTask).actionType, (task as INowTask).actionBody);
    }
  }

  private execAction(type: Action, body: string) {
    switch (type) {
      case Action.File:
        ExecFile(body);
        break;
      case Action.Link:
        OpenLink(body);
        break;
    }
  }

  private showNotification(t: string, m: string) {
    if (this.settingsStore.Get().Notifications) {
      Notif(t, m);
    }
  }

}

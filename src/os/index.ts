import { IOS } from "src/interfaces/os";
import { Action } from "src/models/action";
import { ISettingsStore } from "src/interfaces/settingsStore";
import { INowTask } from "src/models/now.tasks";

import {
  NotifAction,
  SaveFile,
  ChooseFile,
  OpenFile,
  WriteToFile,
  ExecuteFile,
  OpenLink} from "./methods";

interface IOSProps {
  showNotifs: boolean;
}

export class OS implements IOS {
  private settingsStore: ISettingsStore;
  private nowTimeout: any;
  private getCurrentTask: ((() => Promise<INowTask | null>) | null);

  constructor(settingsStore: ISettingsStore) {
    this.settingsStore = settingsStore;
    this.getCurrentTask = null;
    this.timerStart();
  }

  public registerTimerCallbcak(func: (newHour: number) => void) {
    this.timeOutCallback = func;
  }

  public registerGetCurrentTask(func: () => Promise<INowTask | null>) {
    this.getCurrentTask = func;
  }

  public saveFile() {
    return SaveFile();
  }

  public chooseFile() {
    return ChooseFile();
  }

  public readFile(path: string) {
    return OpenFile(path);
  }

  // public setSettings(s: IOSSettings): void {
  //   // this.settings = s;
  // }

  public writeFile(path: string, data: string) {
    return WriteToFile(path, data);
  }
  private timeOutCallback: (hours: number) => void = () => null;

  private async timerStart() {
    const date: Date = new Date();

    this.nowTimeout = setTimeout(this.timerStart.bind(this),
      (60 - date.getMinutes()) * 60000);

    if (!this.getCurrentTask) { return; }

    const task: INowTask | null = await this.getCurrentTask();
    if (this.timeOutCallback) { this.timeOutCallback(date.getHours()); }
    if (task != null) {
        // If tasks is just starting and not continuing
        if (task.start === date.getHours()) {
          this.showNotification((task as INowTask).name, (task as INowTask).describe);
          this.execAction((task as INowTask).actionType, (task as INowTask).actionBody);
        }
    }
  }

  private execAction(type: Action, body: string) {
    switch (type) {
      case Action.File:
        ExecuteFile(body);
        break;
      case Action.Link:
        OpenLink(body);
        break;
    }
  }

  private showNotification(t: string, m: string) {
    if (this.settingsStore.Get().Notifications) {
      NotifAction(t, m);
    }
  }

}

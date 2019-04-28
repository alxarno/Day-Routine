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
import { IScheduleUnit, ScheduleUnitType } from "src/models/schedule.unit";
import { IDeadZone } from "src/models/dead_zone";

interface IOSProps {
  showNotifs: boolean;
}

export class OS implements IOS {
  private settingsStore: ISettingsStore;
  private nowTimeout: any;
  private getCurrentTask: ((() => Promise<IScheduleUnit>) | null);

  constructor(settingsStore: ISettingsStore) {
    this.settingsStore = settingsStore;
    this.getCurrentTask = null;
    this.timerStart();
  }

  public registerTimerCallbcak(func: (newHour: number) => void) {
    this.timeOutCallback = func;
  }

  public registerGetCurrentTask(func: () => Promise<IScheduleUnit>) {
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

    const task: IScheduleUnit = await this.getCurrentTask();
    if (this.timeOutCallback) { this.timeOutCallback(date.getHours()); }
    // If tasks is just starting and not continuing
    if (task.data.start === date.getHours()) {
      if (task._type === ScheduleUnitType.Task) {
        this.showNotification((task.data as INowTask).name, (task.data as INowTask).describe);
        this.execAction((task.data as INowTask).actionType, (task.data as INowTask).actionBody);
      } else {
        this.showDeadZonesNotification((task.data as IDeadZone).name);
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

  private showDeadZonesNotification(t: string) {
    if (this.settingsStore.Get().DeadZoneNotifications) {
      NotifAction(t, "Time to relax...");
    }
  }

}

import {IStorage} from "src/interfaces/storage";

import {
  ICore,
  IScheduleCore,
  ISettingsCore,
  IRoutinesCore,
  IDeadZonesCore,
  IStatisticCore,
} from "src/interfaces/core";

import {ICache} from "src/interfaces/cache";

import {ScheduleCore} from "./modules/schedule";
import {SettingsCore} from "./modules/settings";
import { IOS } from "src/interfaces/os";
import { INowTask } from "src/models/now.tasks";
import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import { ISettingsStore, ISettings } from "src/interfaces/settingsStore";

export class Core implements ICore {
  private Storage: IStorage;
  private Cache: ICache;

  private ScheduleModule: IScheduleCore;
  private SettingsModule: ISettingsCore;
  private os: IOS;

  constructor(storage: IStorage, cache: ICache, os: IOS, settingsStore: ISettingsStore) {
    this.Storage = storage;
    this.Cache = cache;

    this.os = os;
    this.os.registerGetCurrentTask(this.GetCurrentTask.bind(this));
    this.os.registerTimerCallbcak(this.HourIsGone.bind(this));

    this.ScheduleModule = new ScheduleCore({storage: this.Storage, cash: this.Cache});
    this.SettingsModule = new SettingsCore(
      {
        storage: this.Storage,
        os: this.os,
        settings_storage: settingsStore,
        settings_apply: this.settingsApply.bind(this),
      });
  }

  public async GetCurrentTask(): Promise<INowTask | null> {
    const schedule: Array< INowTask | null> = await this.ScheduleModule.Get();
    return schedule[new Date().getHours()];
  }

  public HourIsGone(newHour: number) {
    // console.log(this.Cache.Get());
    const schedule: Array<INowTask | null> = this.Cache.Get();
    let lastTask: INowTask | null = null;
    if (newHour === 0) {
      if (schedule[23]) {
        lastTask = (schedule[23] as INowTask);
      }
    } else {
      if (schedule[newHour - 1]) {
        lastTask = (schedule[newHour - 1] as INowTask);
      }
    }
    if (lastTask) { this.Storage.Statistics().Add({hours: 1, routineID: lastTask.ID}); }
  }

  public async FreeTime(): Promise<number> {
    const deadZones: IDeadZone[] = (await this.DeadZones().Get() as IDeadZone[]);
    const routines: IRoutine[] = (await this.Routines().Get() as IRoutine[]);
    let freeTime: number = 24 * 7;
    deadZones.forEach((val: IDeadZone) => {
      if (!val.enable) {return; }
      let hoursPerDay: number = 0;
      if (val.start > val.done) {
        hoursPerDay = 24 - val.start + val.done;
      } else if (val.done > val.start) {
        hoursPerDay = val.done - val.start;
      }
      freeTime -= hoursPerDay * (7 - val.disabled_days.length);
    });

    routines.forEach((val: IRoutine) => {
      freeTime -= val.hours;
    });
    return freeTime;
  }

  public Statistics(): IStatisticCore {
    return this.Storage.Statistics();
  }

  public Routines(): IRoutinesCore {
    return this.Storage.Routines();
  }

  public DeadZones(): IDeadZonesCore {
    return this.Storage.DeadZones();
  }

  public Schedule(): IScheduleCore {
    return this.ScheduleModule;
  }

  public Settings(): ISettingsCore {
    return this.SettingsModule;
  }

  private settingsApply(settings: ISettings): void {
    // this.os.setSettings({Notifications: settings.Notifications});
    return;
  }
}

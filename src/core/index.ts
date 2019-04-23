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
import { IScheduleUnit, ScheduleUnitType } from "src/models/schedule.unit";

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

    this.ScheduleModule = new ScheduleCore({storage: this.Storage, cache: this.Cache});
    this.SettingsModule = new SettingsCore(
      {
        storage: this.Storage,
        os: this.os,
        settings_storage: settingsStore,
        settings_apply: this.settingsApply.bind(this),
      });
    // REGISTER ALL CALLBACKS AFTER SCHEDULE AND SETTINGS MODULE CREATING
    // CAUSE FUNCS BELOW USE THE MODULES
    this.os.registerGetCurrentTask(this.GetCurrentTask.bind(this));
    this.os.registerTimerCallbcak(this.HourIsGone.bind(this));
    // this.GetCurrentTask().then((v) => console.log(v));
  }

  public async GetCurrentTask(): Promise<IScheduleUnit> {
    const schedule: IScheduleUnit[] = await this.ScheduleModule.Get();

    const targetHOUR = new Date().getHours();
    let hourCounter = 0;
    let answer: IScheduleUnit = {
      data: {
        ID: -1,
        disabled_days: [],
        done: 24,
        start: 0,
        enable: true,
        name: "Empty",
      },
      _type: ScheduleUnitType.DeadZone,
    };

    schedule.forEach((v) => {
      if (hourCounter > targetHOUR) {return; }

      const hours: number = (v._type === ScheduleUnitType.DeadZone ? 1 : (v.data as INowTask).hours);
      if (v.data.start <= targetHOUR && targetHOUR < v.data.start + hours) {
          answer = v;
        }
      hourCounter += hours;
      return;
    });
    return answer;
  }

  public HourIsGone(newHour: number) {
    let schedule: Array<INowTask | null> = this.Cache.Get();

    let lastTaskID: number = -1;
    if (newHour === 0) {
      schedule = this.Cache.GetYesterday();
      if (schedule.length === 0) {return; }
      if (schedule[schedule.length - 1] != null) {
        lastTaskID = (schedule[schedule.length - 1] as INowTask).ID;
      }
    } else {
      const lastHour = newHour - 1;
      schedule.forEach((t) => {
        if (t !== null) {
          if (t.start <= lastHour && lastHour < t.start + t.hours) {
            lastTaskID = t.ID;
          }
        }
      });
    }

    if (lastTaskID !== -1) {
      this.Storage.Statistics().Add({hours: 1, routineID: lastTaskID});
    }
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

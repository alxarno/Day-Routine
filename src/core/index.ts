import {IStorage} from "src/interfaces/storage";

import {
  ICore,
  IScheduleCore,
  ISettingsCore,
  IRoutinesCore,
  IDeadZonesCore,
} from "src/interfaces/core";

import {ICache} from "src/interfaces/cache";

import {ScheduleCore} from "./modules/schedule";
import {SettingsCore} from "./modules/settings";
import { IOS } from "src/interfaces/os";
import { OS } from "src/os";
import { NowTask } from "src/models/now.tasks";
import { Routine } from "src/models/routines.routine";
import { DeadZone } from "src/models/dead_zone";

export class Core implements ICore {
  private Storage: IStorage;
  private Cache: ICache;

  private ScheduleModule: IScheduleCore;
  private SettingsModule: ISettingsCore;
  private os: IOS;

  constructor(storage: IStorage, cache: ICache, os: IOS) {
    this.Storage = storage;
    this.Cache = cache;

    this.os = os;
    this.os.registerGetCurrentTask(this.GetCurrentTask.bind(this));
    this.os.registerTimerCallbcak(this.HourIsGone.bind(this));

    this.ScheduleModule = new ScheduleCore({storage: this.Storage, cash: this.Cache});
    this.SettingsModule = new SettingsCore({storage: this.Storage, os: this.os});
  }

  public async GetCurrentTask(): Promise<NowTask | null> {
    const schedule: Array< NowTask | null> = await this.ScheduleModule.Get();
    return schedule[new Date().getHours()];
  }

  public HourIsGone(newHour: number) {
    const schedule: Array<NowTask | null> = JSON.parse(this.Cache.Get());
    let lastTask: NowTask | null = null;
    if (newHour === 0) {
      if (schedule[23]) {
        lastTask = (schedule[23] as NowTask);
      }
    } else {
      if (schedule[newHour - 1]) {
        lastTask = (schedule[newHour - 1] as NowTask);
      }
    }
    if (lastTask) { this.Storage.Statistics().Add({hours: 1, routineID: lastTask.ID}); }
  }

  public async FreeTime(): Promise<number> {
    const deadZones: DeadZone[] = (await this.DeadZones().Get() as DeadZone[]);
    const routines: Routine[] = (await this.Routines().Get() as Routine[]);
    let freeTime: number = 24 * 7;

    deadZones.forEach((val: DeadZone) => {
      if (!val.enable) {return; }
      let hoursPerDay: number = 0;
      if (val.start > val.done) {
        hoursPerDay = 24 - val.start + val.done;
      } else if (val.done > val.start) {
        hoursPerDay = val.done - val.start;
      }
      freeTime -= hoursPerDay * val.disabled_days.length;
    });

    routines.forEach((val: Routine) => {
      freeTime -= val.hours;
    });
    return freeTime;
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
}

import {IStorage} from "src/interfaces/storage";

import {
  ICore,
  IScheduleCore,
  ISettingsCore,
  IRoutinesCore,
  IDeadZonesCore,
  IStatisticCore,
  ISyncCore,
} from "src/interfaces/core";

import {ICache} from "src/interfaces/cache";

import {ScheduleCore} from "./modules/schedule";
import {SettingsCore} from "./modules/settings";
import { IOS } from "src/interfaces/os";
import { INowTask } from "src/models/now.tasks";
import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import { ISettingsStore, ISettings } from "src/interfaces/settingsStore";
import IStatistics from "src/models/statistics";
import { IUserInterface } from "src/interfaces/ui";
import { ISync, ISyncData } from "src/interfaces/sync";
import { SyncCore } from "./modules/sync";

export class Core implements ICore {
  private storage: IStorage;
  private cache: ICache;

  private ScheduleModule: IScheduleCore | null = null;
  private SettingsModule: ISettingsCore | null = null;
  private SyncModule: ISyncCore | null = null;
  private os: IOS | null = null;
  private sync: ISync | null = null;
  private ui: IUserInterface | null = null;
  private onClose: ((f: (c: () => void) => void) => void) | null = null;

  constructor(
      storage: IStorage,
      cache: ICache,
      os: IOS,
      settingsStore: ISettingsStore,
      sync: () => ISync,
      ui: (core: ICore) => IUserInterface,
      onClose: (f: (c: () => void) => void) => void,
    ) {

    this.onClose = onClose;
    this.storage = storage;
    this.cache = cache;

    this.sync = sync();
    this.os = os;

    this.ScheduleModule = new ScheduleCore({storage, cache});
    this.SettingsModule = new SettingsCore(
      {
        storage,
        os,
        cache,
        settings_storage: settingsStore,
        settings_apply: this.settingsApply.bind(this),
      });

    // REGISTER ALL CALLBACKS AFTER SCHEDULE AND SETTINGS MODULE CREATING
    // CAUSE FUNCS BELOW USE THE MODULES
    this.os.registerGetCurrentTask(this.ScheduleModule.GetCurrentTask.bind(this.ScheduleModule));
    this.os.registerTimerCallbcak(this.HourIsGone.bind(this));

    // this.ui = ui(this);
    this.init(ui);
    // this.ui.ShowModal({
    //   Content: {
    //     Callback: (pass: string) => console.log(pass),
    //     SyncID: "228-2228",
    //   },
    //   Type: ModalType.SyncPass,
    // });
    // this.Network.Broadcast();
    // this.ui.ShowSnackBar(SnackBarType.Notifier, {Data: "hello"});
    // new Promise((rej) => setTimeout(rej, 2000)).then(() => {
    // this.ui.ShowSnackBar(SnackBarType.Error, {Data: "Erro"});
    // });
    // this.ui.ShowSnackBar(SnackBarType.NewConnection, {Key: "2323-8976", Callback: (v) => {console.log(v); }});
  }

  public HourIsGone(newHour: number) {
    let schedule: Array<INowTask | null> = this.cache.Get();

    let lastTaskID: number = -1;
    if (newHour === 0) {
      schedule = this.cache.GetYesterday();
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
      this.updateStatistics(1, lastTaskID);
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
      freeTime -= hoursPerDay * (7 - val.disabledDays.length);
    });

    routines.forEach((val: IRoutine) => {
      freeTime -= val.hours;
    });
    return freeTime;
  }

  public Sync(): ISyncCore {
    return this.SyncModule!;
  }

  public Statistics(): IStatisticCore {
    return this.storage.Statistics();
  }

  public Routines(): IRoutinesCore {
    return this.storage.Routines();
  }

  public DeadZones(): IDeadZonesCore {
    return this.storage.DeadZones();
  }

  public Schedule(): IScheduleCore {
    return this.ScheduleModule!;
  }

  public Settings(): ISettingsCore {
    return this.SettingsModule!;
  }

  private async init(ui: (core: ICore) => IUserInterface) {
    await this.storage.Init();
    this.ui = ui(this);
    this.SyncModule = new SyncCore({sync: this.sync, ui: this.ui, onClose: this.onClose});
    this.SyncModule.Init();
    // this.SyncModule.
  }

  private async updateStatistics(hours: number, routineID: number): Promise<void> {
    // await this.storage.Statistics().Add({hours, routineID});
    // const deadZones: IDeadZone[] = (await this.DeadZones().Get() as IDeadZone[]);
    // const routines: IRoutine[] = (await this.Routines().Get() as IRoutine[]);
    // const statistics: IStatistics[] = (await this.Statistics().Get() as IStatistics[]);
    // const sData: ISyncData = {
    //   dbSchemaVersion: this.storage.SchemaVersion(),
    //   deadZones,
    //   routines,
    //   statistics,
    // };
    // await this.sync!.Broadcast();
  }

  private settingsApply(settings: ISettings): void {
    // this.os.setSettings({Notifications: settings.Notifications});
    return;
  }

  // private onClose() {
  //   //
  //   console.log("Close");
  // }
}

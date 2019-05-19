import CoreModule from "./module";
import { ISettingsCore, IRoutinesCore } from "src/interfaces/core";
import { IDeadZone } from "src/models/dead_zone";
import { IRoutine } from "src/models/routines.routine";
import { ISettings } from "src/interfaces/settingsStore";

export class SettingsCore extends CoreModule implements ISettingsCore {

  public async Import() {
    if (!this.os || !this.storage) {return; }
    const path: string = await this.os.chooseFile();
    const data: string = await this.os.readFile(path[0]);
    await this.ClearAll();
    const newData: {routines: IRoutine[], dead_zones: IDeadZone[]} = JSON.parse(data);
    newData.routines.forEach((element: IRoutine) => {
      this.storage!.Routines().Create(element);
    });

    newData.dead_zones.forEach((element: IDeadZone) => {
      this.storage!.DeadZones().Create(element);
    });
  }

  public async Delete() {
    return;
  }

  public async Export() {

    if (!this.os || !this.storage) {return; }
    const routines: Promise<IRoutine[]> = this.storage.Routines().Get();
    const deadZones: Promise<IDeadZone[]> = this.storage.DeadZones().Get();
    const final: {[key: string]: any} = {};
    await Promise.all([routines, deadZones]).then((result: {0: any, 1: any}) => {
      /* tslint:disable:no-string-literal */
      final["routines"] = result[0];
      final["dead_zones"] = result[1];
      /* tslint:enable:no-string-literal */
    });

    const fileName: string = await this.os.saveFile();
    await this.os.writeFile(fileName, JSON.stringify(final));
  }

  public async ClearAll() {
    const routines: Promise<IRoutine[]> = this.storage!.Routines().Get();
    const deadZones: Promise<IDeadZone[]> = this.storage!.DeadZones().Get();
    const delQuerys: Array< Promise<void> > = [];
    await Promise.all([routines, deadZones]).then((result: {0: any[], 1: any[]}) => {
      result[0].forEach((element: {ID: string}) => {
        delQuerys.push(this.storage!.Routines().Delete({ID: element.ID}));
      });
      result[1].forEach((element: {ID: string}) => {
        delQuerys.push(this.storage!.DeadZones().Delete({ID: element.ID}));
      });
    });
    await Promise.all(delQuerys);
    if (this.cache) {
      this.cache.Clear();
    }
  }

  public Get(): ISettings {
    const settings: ISettings = this.settingsStorage!.Get();
    return settings;
  }

  public Put(s: ISettings): void {
    this.settingsStorage!.Put(s);
    this.settingsApply!(s);
  }

  public UpdateNetworkID(): void {
    this.settingsStorage!.UpdateNetworkID();
  }
}

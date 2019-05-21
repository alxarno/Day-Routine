import CoreModule from "./module";
import { ISyncCore } from "src/interfaces/core";
import { SnackBarType, ISnackBarNewConnection } from "src/models/snackbar";
import { ModalType } from "src/models/modals";
import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import IStatistics from "src/models/statistics";
import { ISyncData } from "src/interfaces/sync";

export class SyncCore extends CoreModule implements ISyncCore {
  constructor(props: {[key: string]: any}) {
    super(props);

  }

  public Push() {
    //
  }

  public Recieve() {
    //
  }

  public async Init() {
    this.sync!.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
      getPassword: this.getPassword.bind(this),
      failedDecode: this.failedDecode.bind(this),
      successDecode: this.successDecode.bind(this),
    });
    await this.sync!.Start();
  }

  private async getPassword(syncID: string): Promise<string> {
    const syncDevices = await this.storage!.SyncDevices().Get();
    for (const device of syncDevices) {
      if (device.name === syncID) {
        return device.key;
      }
    }
    return "";
  }

  private async failedDecode(syncID: string): Promise<string> {
    return new Promise((res) => {
      this.ui!.ShowModal({
        Type: ModalType.SyncPass,
        Content: {
           SyncID: syncID,
           Callback: (pass: string) => {
             res(pass);
           },
        },
      });
    });
  }

  private async successDecode(syncID: string, pass: string): Promise<void> {
    const syncDevices = await this.storage!.SyncDevices().Get();
    for (const device of syncDevices) {
      if (device.name === syncID) {
        device.key = pass;
        await this.storage!.SyncDevices().Update(device);
        return;
      }
    }
    this.storage!.SyncDevices().Create({
      ID: -1,
      key: pass,
      name: syncID,
    });
  }

  private async newDataRequest(syncID: string) {
    const snack: ISnackBarNewConnection = {
      SyncID: syncID,
      Callback: (v) => {
        if (v) {
          this.sync!.AcceptRequest(syncID);
        } else {
          this.sync!.DismissRequest(syncID);
        }
      },
    };
    snack.Callback.bind(this);
    this.ui!.ShowSnackBar(SnackBarType.NewConnection, snack);
  }

  private async newDataDistribution(syncID: string) {
    this.sync!.AcceptRequest(syncID);
  }

  private async getDataForTransmition(): Promise<string> {
    const deadZones: IDeadZone[] = (await this.storage!.DeadZones().Get() as IDeadZone[]);
    const routines: IRoutine[] = (await this.storage!.Routines().Get() as IRoutine[]);
    const statistics: IStatistics[] = (await this.storage!.Statistics().Get() as IStatistics[]);
    const sData: ISyncData = {
      deadZones,
      routines,
      statistics,
    };
    // await this.sync!.Broadcast();
    return JSON.stringify(sData);
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    console.log("Got data from transmission - ", data, dbSchemaVersion);
  }
}

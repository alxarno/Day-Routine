import CoreModule from "./module";
import { ISyncCore } from "src/interfaces/core";
import { SnackBarType, ISnackBarNewConnection } from "src/models/snackbar";

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
    });
    await this.sync!.Start();
  }

  private async getPassword(syncID: string): Promise<string> {
    //
    return "";
  }

  private async failedDecode(syncID: string): Promise<string> {
    return "";
  }

  private async newDataRequest(ID: string) {
    const snack: ISnackBarNewConnection = {
      SyncID: ID,
      Callback: (v) => {
        if (v) {
          this.sync!.AcceptRequest(ID);
        } else {
          this.sync!.DismissRequest(ID);
        }
      },
    };
    snack.Callback.bind(this);
    this.ui!.ShowSnackBar(SnackBarType.NewConnection, snack);
  }

  private async newDataDistribution(ID: string) {
    this.sync!.AcceptRequest(ID);
  }

  private getDataForTransmition(): string {
    return "TEST 228";
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    console.log("Got data from transmission - ", data, dbSchemaVersion);
  }
}

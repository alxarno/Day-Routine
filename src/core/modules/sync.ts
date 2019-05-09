import CoreModule from "./module";
import { ISyncCore } from "src/interfaces/core";
import { SnackBarType, ISnackBarNewConnection } from "src/models/snackbar";

export class SyncCore extends CoreModule implements ISyncCore {
  constructor(props: {[key: string]: any}) {
    super(props);
    this.sync!.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
    });
    this.sync!.Start().then((v) => console.log("Sync started"));
  }

  public Push() {
    //
  }

  public Recieve() {
    //
  }

  private async newDataRequest(ID: string) {
    const snack: ISnackBarNewConnection = {
      NetworkID: ID,
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
    // this.sync!.AcceptRequest(ID);
  }
  private async newDataDistribution(ID: string) {
    //
    this.sync!.AcceptRequest(ID);
  }
  private getDataForTransmition(): string {
    //
    return "TEST 228";
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    console.log("Got data from transmission - ", data, dbSchemaVersion);
  }
}

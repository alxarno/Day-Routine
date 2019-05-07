import CoreModule from "./module";
import { ISyncCore } from "src/interfaces/core";

export class SyncCore extends CoreModule implements ISyncCore {
  constructor(props: {[key: string]: any}) {
    super(props);
    this.sync!.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
    });
    this.sync!.Start();
  }

  public Push() {
    //
  }

  public Recieve() {
    //
  }

  private async newDataRequest(ID: string) {
    //
    this.sync!.AcceptRequest(ID);
  }
  private async newDataDistribution(ID: string) {
    //
  }
  private getDataForTransmition(): string {
    //
    return "TEST 228";
  }
  private gotDataFromTransmition(data: string): void {
    //
  }
}

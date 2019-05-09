import { ISync } from "src/interfaces/sync";

export enum BasicAction {
  Request = 1,
  Distribution,
  None,
}

export class SyncCore {
  private sync: ISync;
  private name: string;

  constructor(sync: ISync, actionAfterStart: BasicAction, name: string) {
    this.sync = sync;
    this.name = name;
    this.sync.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
    });
    this.sync.Start().then((v) => {
      if (!v) {
        console.log(`${this.name} didn't started`);
        return;
      }
      console.log(`${this.name} started`);
      switch (actionAfterStart) {
        case BasicAction.Request:
          this.sync.Request();
          break;
        case BasicAction.Distribution:
          this.sync.Broadcast();
          break;
        case BasicAction.None:
          break;
      }
    });
  }

  public Push() {
    //
  }

  public Recieve() {
    //
  }

  private async newDataRequest(ID: string) {
    this.sync.AcceptRequest(ID);
  }

  private async newDataDistribution(ID: string) {
    this.sync.AcceptRequest(ID);
  }

  private getDataForTransmition(): string {
    //
    return "TEST 228";
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    console.log(`${this.name} got data from transmission - ${data}, db schema - ${dbSchemaVersion}`);
  }
}

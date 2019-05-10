import { ISync } from "src/interfaces/sync";

export enum BasicAction {
  Request = 1,
  Distribution,
  None,
}

export class SyncTest {
  private sync: ISync;
  private name: string;
  private testData: string;

  constructor(sync: ISync, actionAfterStart: BasicAction, name: string, data: string) {
    this.sync = sync;
    this.name = name;
    this.testData = data;
    this.sync.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
    });
    this.sync.Start().then((v) => {
      if (!v) {
        console.log(`${this.name}: didn't started`);
        return;
      }
      console.log(`${this.name}: Started`);
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

  get Data() {
    return this.testData;
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
    return this.testData;
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    this.testData = data;
    console.log(`${this.name}: Got data from transmission - ${data}, db schema - ${dbSchemaVersion}`);
  }
}

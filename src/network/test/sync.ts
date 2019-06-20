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
  private debug: boolean;

  constructor(sync: ISync, name: string, data: string, debug: boolean) {
    this.sync = sync;
    this.name = name;
    this.testData = data;
    this.debug = debug;
    this.sync.Init({
      getDataForTransmition: this.getDataForTransmition.bind(this),
      gotDataFromTransmition: this.gotDataFromTransmition.bind(this),
      newDataDistribution: this.newDataDistribution.bind(this),
      newDataRequest: this.newDataRequest.bind(this),
      getPassword: this.password.bind(this),
      failedDecode: this.failedDecodeMessage.bind(this),
      successDecode: async (syncID: string, pass: string) => {/* */},
    });
  }

  public async Start(actionAfterStart: BasicAction) {
    const started = await this.sync.Start();
    if (!started && this.debug) {
      console.log(`${this.name}: didn't started`);
      return;
    }
    if (this.debug) {
      console.log(`${this.name}: Started`);
    }
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

  private async failedDecodeMessage(syncID: string): Promise<string> {
    //
    return new Promise((res, rej) => setTimeout(() => res("Bingo1"), 500));
  }

  private async password(syncID: string): Promise<string> {
    //
    return new Promise((res, rej) => setTimeout(() => res("Bingo2"), 500));
  }

  private async newDataRequest(ID: string) {
    this.sync.AcceptRequest(ID);
  }

  private async newDataDistribution(ID: string) {
    this.sync.AcceptRequest(ID);
  }

  private async getDataForTransmition(): Promise<string> {
    //
    return this.testData;
  }
  private gotDataFromTransmition(data: any, dbSchemaVersion: string): void {
    //
    this.testData = data;
    if (this.debug) {
      console.log(`${this.name}: Got data from transmission - ${data}, db schema - ${dbSchemaVersion}`);
    }
  }
}

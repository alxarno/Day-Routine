import { INetwork,  INetworkAnswer, INetworkData } from "src/interfaces/network";
import { ISettings } from "src/interfaces/settingsStore";
import { INetworkServer, IRequestInfo } from "./server";

export default class Network implements INetwork {
  private dbScehmaVersion: string;
  private settings: () => ISettings;
  private server: INetworkServer;
  private debug: boolean;
  private port: number;

  constructor(dbSchemaVersion: string, settings: () => ISettings, debug: boolean, port: number) {
    this.port = port;
    this.debug = debug;
    this.dbScehmaVersion = dbSchemaVersion;
    this.settings = settings;
    this.server = new INetworkServer(debug, port, this.Receive, this.Error);
  }

  public async Broadcast(data: INetworkData): Promise<void> {
    //
  }

  public async Request(): Promise<INetworkAnswer> {
    const res: any =  await new Promise((res, rej) => {
      rej(new Error("Fuck"));
    });
    return {data: null, error: new Error("Fuck")};
    //
  }

  private Receive(msg: string , rinfo: IRequestInfo) {
    //
    if (this.debug) {
      console.log(`Server recive ${msg} from ${rinfo.address}:${rinfo.port}`);
    }
  }

  private Error(err: Error) {
    if (this.debug) {
      console.log(`Server errror ${err}`);
    }
  }

}

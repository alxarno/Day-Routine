import { TCPConn, ISettingForTCP } from "./tcpconn";
import { IMessage } from "./messages";
import { settings } from "src/view/store/modules/settings";
import { ISocket } from "./net";

export interface ITCPFactoryConfig {
  name: string;
  tcpdebug: boolean;
  // getPassword: (networkID: string) => Promise<string>;
  // failedDecode: (networkID: string) => Promise<string>;
  // successDecode: (networkID: string, pass: string) => Promise<void>;
  settings: () => ISettingForTCP;
  recive: (msg: IMessage) => void;
  closed: (ID: number) => void;
  // giveAway: ()
}

export interface ITCPFactory {
  Init: (config: ITCPFactoryConfig) => Promise<boolean>;
  Create: (socket: ISocket, fresh: boolean) => TCPConn;
}

export class TCPFactory implements ITCPFactory {

  private IDCounter: number = 0;
  // private settings: (() => ISettingForTCP) | null = null;
  // private debug: boolean = false;
  // private serverName: string = "";

  // private keys: (CryptoKeyPair | null) = null;
  // private recieved: ((msg: IMessage) => void) | null = null;
  // private closed: ((ID: number) => void) | null = null;
  // private getPassword: ((networkID: string) => Promise<string>) | null = null;
  // private failedDecode: ((networkID: string) => Promise<string>) | null = null;
  // private successDecode: ((networkID: string, pass: string) => Promise<void>) | null = null;

  private data: ITCPFactoryConfig  | null = null;

  constructor() {
    //
  }

  public async Init(config: ITCPFactoryConfig): Promise<boolean> {
    this.data = config;
  // this.settings = settingsFunc;
  // this.debug = tcpdebug;
  // this.serverName = name;
  // this.recieved = recive;
  // this.closed = close;
  // this.getPassword = getPassword;
  // this.failedDecode = failedDecode;
  // this.successDecode = successDecode;
  // try {
    // if (this.debug) {
    //   console.log(`${this.serverName}: Generating RSA keys ...`);
    // }
    // const keys = await GenerateKeys();
    // this.keys = keys;
    // this.publicKey = keys.pub;
    // this.privateKey = keys.priv;
  //   if (this.debug) {
  //     console.log(`${this.serverName}: RSA keys created`);
  //   }
  // } catch (e) {
  //   if (this.debug) {
  //     console.log(`${this.serverName}: TCP cannot create keys - error ${e}`);
  //   }
  //   return false;
  // }
    return true;
  }

  public Create(socket: ISocket, fresh: boolean) {
    if (!this.data) {
      throw new Error("TCPFactory yet didn't inited");
    }
    return new TCPConn(socket, fresh, this.IDCounter++, this.data);
  }
}

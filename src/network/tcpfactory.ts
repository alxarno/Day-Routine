import { TCPConn, ISocket, ISettingForTCP } from "./tcpconn";
import { IMessage } from "./messages";
import { GenerateKeys } from "./crypto";
import { settings } from "src/view/store/modules/settings";

export interface ITCPFactory {
  Init: (
    settingsFunc: () => ISettingForTCP,
    recive: (msg: IMessage) => void,
    close: (ID: number) => void,
    tcpdebug: boolean,
    name: string,
    getPassword: (networkID: string) => Promise<string>,
    failedDecode: (networkID: string) => Promise<string>,
    generateKeys: boolean,
  ) => Promise<boolean>;
  Create: (socket: ISocket, fresh: boolean) => TCPConn;
}

export class TCPFactory implements ITCPFactory {

  private IDCounter: number = 0;
  private settings: (() => ISettingForTCP) | null = null;
  private debug: boolean = false;
  private serverName: string = "";

  // Test key for test, it will overwrite within startup
  private publicKey: Buffer = Buffer.from("");
  // Test key for test, it will overwrite within startup
  private privateKey: Buffer = Buffer.from("");
  private recieved: ((msg: IMessage) => void) | null = null;
  private closed: ((ID: number) => void) | null = null;
  private getPassword: ((networkID: string) => Promise<string>) | null = null;
  private failedDecode: ((networkID: string) => Promise<string>) | null = null;

  constructor() {
    //
  }

  public async Init(
    settingsFunc: () => ISettingForTCP,
    recive: (msg: IMessage) => void,
    close: (ID: number) => void,
    tcpdebug: boolean,
    name: string,
    getPassword: (networkID: string) => Promise<string>,
    failedDecode: (networkID: string) => Promise<string>,
  ): Promise<boolean> {
  this.settings = settingsFunc;
  this.debug = tcpdebug;
  this.serverName = name;
  this.recieved = recive;
  this.closed = close;
  this.getPassword = getPassword;
  this.failedDecode = failedDecode;
  try {
    if (this.debug) {
      console.log(`${this.serverName}: Generating RSA keys ...`);
    }
    const keys = await GenerateKeys(this.settings().UserPass);

    this.publicKey = keys.pub;
    this.privateKey = keys.priv;
    if (this.debug) {
      console.log(`${this.serverName}: RSA keys created`);
    }
  } catch (e) {
    if (this.debug) {
      console.log(`${this.serverName}: TCP cannot create keys - error ${e}`);
    }
    return false;
  }
  return true;
  }

  public Create(socket: ISocket, fresh: boolean) {
    return new TCPConn(socket, fresh, this.IDCounter++, this.debug,
      this.serverName, this.settings!, this.publicKey, this.privateKey,
      this.recieved!, this.closed!, this.getPassword!, this.failedDecode!);
  }
}

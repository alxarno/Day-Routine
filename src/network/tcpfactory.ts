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
    successDecode: (networkID: string, pass: string) => Promise<void>,
  ) => Promise<boolean>;
  Create: (socket: ISocket, fresh: boolean) => TCPConn;
}

export class TCPFactory implements ITCPFactory {

  private IDCounter: number = 0;
  private settings: (() => ISettingForTCP) | null = null;
  private debug: boolean = false;
  private serverName: string = "";

  private keys: (CryptoKeyPair | null) = null;
  private recieved: ((msg: IMessage) => void) | null = null;
  private closed: ((ID: number) => void) | null = null;
  private getPassword: ((networkID: string) => Promise<string>) | null = null;
  private failedDecode: ((networkID: string) => Promise<string>) | null = null;
  private successDecode: ((networkID: string, pass: string) => Promise<void>) | null = null;

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
    successDecode: (networkID: string, pass: string) => Promise<void>,
  ): Promise<boolean> {
  this.settings = settingsFunc;
  this.debug = tcpdebug;
  this.serverName = name;
  this.recieved = recive;
  this.closed = close;
  this.getPassword = getPassword;
  this.failedDecode = failedDecode;
  this.successDecode = successDecode;
  try {
    if (this.debug) {
      console.log(`${this.serverName}: Generating RSA keys ...`);
    }
    const keys = await GenerateKeys();
    this.keys = keys;
    // this.publicKey = keys.pub;
    // this.privateKey = keys.priv;
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
      this.serverName, this.settings!, this.keys!,
      this.recieved!, this.closed!, this.getPassword!, this.failedDecode!, this.successDecode!);
  }
}

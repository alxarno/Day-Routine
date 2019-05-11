import { GenerateKeys } from "./crypto";
import { NetworkMessage, MessageType, Action, IPublicKey, IReady, IMessage, IPublicKeyDelivery } from "./messages";
import { IRequestInfo } from "./interfaces";

export interface ISocket {
  connect: (port: number, addr: string, c: () => void) => void;
  on: (e: string, c: (...data: any[]) => void) => void;
  pipe: (socket: ISocket) => void;
  listen: (port: number, callback: () => void) => void;
  address: () => any;
  write: (mes: string, c?: () => void) => void;
  destroy: () => void;
  localAddress: string;
  localPort: number;
  remotePort: number;
  remoteAddress: string;
  setNoDelay: () => void;
  close: () => void;
  connected: boolean;
}

export enum TCPConnState {
  Null,
  Connected,
  KeysGenerated,
  KeyGot,
  KeyDelivered,
  KeysExchanged,
  DataSent,
}

export interface IConnection {
  ID: number;
  socket: ISocket;
  address: string;
  state: TCPConnState;
  remotePublicKey: Buffer;
  networkID: string;

  Send: (msg: string) => void;
  Connect: (addr: string, port: number) => void;
  Close: () => void;
}

export interface ISettingForTCP {
  NetworkID: string;
  UserPass: string;
}

const ipv6prefix  = "::ffff:";
const ondata = "data";
const onerror = "error";
const onclose = "close";

export class TCPConn implements IConnection {
  public ID: number;
  public socket: ISocket;
  public address: string;
  public state: TCPConnState;
  public remotePublicKey: Buffer;
  public networkID: string;

  private messageBuff: string[];
  private debug: boolean;
  private name: string;
  private settings: () => ISettingForTCP;
  private publicKey: Buffer = Buffer.from("");
  private privateKey: Buffer = Buffer.from("");
  private giveAway: (msg: IMessage) => void;
  private closed: (id: number) => void;
  private keyDelivered: boolean = false;

  constructor(socket: ISocket, newSocket: boolean,
              id: number, debug: boolean,
              servername: string,
              settingsFunc: () => ISettingForTCP,
              pubKey: Buffer, privKey: Buffer,
              recieve: (msg: IMessage) => void,
              close: (id: number) => void) {
    this.ID = id;
    this.debug = debug;
    this.name = servername;
    this.settings = settingsFunc;
    this.socket = socket;
    this.address = "";
    this.state = TCPConnState.Null;
    this.remotePublicKey = Buffer.from("");
    this.networkID = "";
    this.messageBuff = [];
    this.publicKey = pubKey;
    this.privateKey = privKey;
    this.giveAway = recieve;
    this.closed = close;

    this.socket.on(ondata, this.recieved.bind(this));
    if (!newSocket) {
      this.socket.setNoDelay();
      this.state = TCPConnState.Connected;
      this.address =  this.socket.remoteAddress ;
      if (this.address.substr(0, 7) === ipv6prefix) {
        this.address = this.address.substr(7);
      }
      // this.sendReady();
      this.sendKey();
    }
  }

  public Send(msg: string) {
    if (this.state !== TCPConnState.KeysExchanged) {
      this.messageBuff.push(msg);
    } else {
      // Encryption
      this.socket.write(msg);
    }
  }

  public Connect(addr: string, port: number) {
    //
    this.address = addr;
    this.socket.connect(port, addr, () => {
      if (this.debug) {
        console.log(`${this.name}: Connected to ${addr}:${port}`);
      }
      this.socket.setNoDelay();
    });
  }

  public Close() {
    //
  }

  private async sendReady() {
    const message: IReady = {
      Action: Action.Ready,
      NetworkID: this.settings().NetworkID,
      Type: MessageType.SystemTCP,
    };
    return new Promise((res, rej) => {
      this.socket.write(JSON.stringify(message));
      setTimeout(res, 50);
    });
  }

  private async sendKey() {
    const message: IPublicKey = {
      Action: Action.PublicKey,
      Key: this.publicKey.toString("utf8"),
      NetworkID: this.settings().NetworkID,
      Type: MessageType.SystemTCP,
    };
    return new Promise((res, rej) => {
      this.socket.write(JSON.stringify(message));
      setTimeout(res, 50);
    });
  }

  private async sendKeyDelivered() {
    const message: IPublicKeyDelivery = {
      Action: Action.PublicKeyDelivery,
      NetworkID: this.settings!().NetworkID,
      Type: MessageType.SystemTCP,
    };
    return new Promise((res, rej) => {
      this.socket.write(JSON.stringify(message));
      setTimeout(res, 50);
    });
  }

  private async sendBuffered() {
    if (this.state !== TCPConnState.KeysExchanged) {
      return;
    }
    for (const m of this.messageBuff) {
      await new Promise((res, rej) => {
        this.socket.write(m);
        setTimeout(res, 50);
      });
    }
  }

  private recieved(m: Buffer, rinfo: IRequestInfo) {
    let message: NetworkMessage;
    message = JSON.parse(m.toString());

    if (message.Type !== MessageType.SystemTCP) {
      this.giveAway({message, IP: this.address});
      return;
    }
    switch ((message as NetworkMessage).Action) {
      case Action.PublicKey:
        if (this.debug) {
          console.log(`${this.name}: Got remote public key`);
        }
        this.remotePublicKey = Buffer.from((message as IPublicKey).Key);
        this.state = (this.state === TCPConnState.KeyDelivered ?
          TCPConnState.KeysExchanged :
          TCPConnState.KeyGot);
        if (!this.keyDelivered) {
          this.sendKeyDelivered().then(this.sendKey.bind(this));
        } else {
          this.sendKeyDelivered().then(this.sendBuffered.bind(this));
        }
        break;
      case Action.PublicKeyDelivery:

        this.state = (this.state === TCPConnState.KeyGot ?
            TCPConnState.KeysExchanged :
            TCPConnState.KeyDelivered);
        console.log(`${this.name}: Public key delivered -> ${this.state},${TCPConnState.KeysExchanged}`);
        this.keyDelivered = true;
        this.sendBuffered();
        break;
    }
  }

  private close() {
    this.closed!(this.ID);
  }

}

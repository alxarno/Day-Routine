import { NetworkMessage, MessageType, Action, IPublicKey, IReady, IMessage, IPublicKeyDelivery } from "./messages";
import { IRequestInfo } from "./interfaces";
import { Encrypt, Decrypt, PubEncrypt, PubDecrypt, publickKeyToPem } from "./crypto";

export interface ISocket {
  connect: (port: number, addr: string, c: () => void) => void;
  on: (e: string, c: (...data: any[]) => void) => void;
  pipe: (socket: ISocket) => void;
  listen: (port: number, callback: () => void) => void;
  address: () => any;
  write: (mes: string | Buffer, c?: () => void) => void;
  destroy: () => void;
  localAddress: string;
  localPort: number;
  remotePort: number;
  remoteAddress: string;
  setNoDelay: () => void;
  close: (c: () => void) => void;
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
  private keys: CryptoKeyPair;
  // private publicKey: Buffer = Buffer.from("");
  // private privateKey: Buffer = Buffer.from("");
  private giveAway: (msg: IMessage) => void;
  private closed: (id: number) => void;
  private keyDelivered: boolean = false;

  private getPassword: (networkID: string) => Promise<string>;
  private failedDecode: (networkID: string) => Promise<string>;
  private successDecode: (networkID: string, pass: string) => Promise<void>;

  constructor(
    socket: ISocket, newSocket: boolean,
    id: number, debug: boolean,
    servername: string,
    settingsFunc: () => ISettingForTCP,
    keys: CryptoKeyPair,
    recieve: (msg: IMessage) => void,
    close: (id: number) => void,
    getPassword: (networkID: string) => Promise<string>,
    failedDecode: (networkID: string) => Promise<string>,
    successDecode: (networkID: string, pass: string) => Promise<void>,
  ) {
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
    this.keys = keys;
    // this.publicKey = pubKey;
    // this.privateKey = privKey;
    this.giveAway = recieve;
    this.closed = close;

    this.failedDecode = failedDecode;
    this.getPassword = getPassword;
    this.successDecode = successDecode;

    this.socket.on(ondata, this.recieved.bind(this));
    if (!newSocket) {
      this.socket.setNoDelay();
      this.state = TCPConnState.Connected;
      this.address =  this.socket.remoteAddress ;
      if (this.address.substr(0, 7) === ipv6prefix) {
        this.address = this.address.substr(7);
      }
      this.sendKey();
    }
  }

  public Send(msg: string) {
    if (this.state !== TCPConnState.KeysExchanged) {
      this.messageBuff.push(msg);
    } else {
      try {
        const hash = Encrypt(msg, this.settings().UserPass);
        PubEncrypt(hash, this.keys.publicKey).then((e) =>  this.socket.write(e));
      } catch (l) {
        if (this.debug) {
          console.log(`${this.name}: TCP failed to encrypt message - `, l);
        }
      }

    }
  }

  public Connect(addr: string, port: number) {
    this.address = addr;
    this.socket.connect(port, addr, () => {
      if (this.debug) {
        console.log(`${this.name}: Connected to ${addr}:${port}`);
      }
      this.socket.setNoDelay();
    });
  }

  public Close() {
    this.socket.destroy();
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
      Key: await publickKeyToPem(this.keys),
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

  private async recieved(m: Buffer, rinfo: IRequestInfo) {
    let message: NetworkMessage;
    try {
      message = JSON.parse(m.toString());
   } catch (e) {
    let decrypted: string;
    const password = this.settings().UserPass;
    if (password) {
      try {
        decrypted = await PubDecrypt(m.toString("utf8"), this.keys.privateKey);
      } catch (d) {
        if (this.debug) {
          console.log(`${this.name}: TCP cannot private decrypt - `, d);
        }
        return;
      }
    } else {
      if (this.debug) {
        console.log(`${this.name}: TCP cannot get password for private decryption`);
      }
      return;
    }
    try {
      const userpass = await this.getPassword(this.networkID);
      const dehashed = Decrypt(decrypted.toString(), userpass);
      message = JSON.parse(dehashed);
      this.successDecode(this.networkID, userpass);
    } catch (l) {
      if (this.debug) {
        console.log(`${this.name}: TCP cannot dehash recieved message - `, l);
      }
      try {
        const newuserpass = await this.failedDecode(this.networkID);
        const dehashed = Decrypt(decrypted.toString(), newuserpass);
        message = JSON.parse(dehashed);
        this.successDecode(this.networkID, newuserpass);
      } catch (l) {
        if (this.debug) {
          console.log(`${this.name}: TCP cannot dehash recieved message 2 time - `, l);
        }
        return;
      }
    }
   }

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
        this.networkID = (message as IPublicKey).NetworkID;
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
        if (this.debug) {
          console.log(`${this.name}: Public key delivered -> ${this.state},${TCPConnState.KeysExchanged}`);
        }
        this.keyDelivered = true;
        this.sendBuffered();
        break;
    }
  }

  private close() {
    this.closed!(this.ID);
  }

}

import { ITCPServer, IRequestInfo } from "./interfaces";
import { GenerateKeys } from "./crypto";
import { NetworkMessage, IPublicKey, Action, MessageType, IMessage } from "./messages";
import { ISocket, TCPConn, ISettingForTCP } from "./tcpconn";
import { TCPFactory } from "./tcpfactory";

//
//        TCP Client                        TCP Server
//           |                                 |
//           |             Connect             |
//           |   ------------------------->    |
//           |                                 |
//           |            CPublic Key          |
//           |   ------------------------->    |
//           |                                 |
//           |           SPublic Key           |
//           |   <-------------------------    |
//           |                                 |
//           |    Encrypted Messsage Data      |
//           |   ------------------------->    |
//           |                                 |
//           |                                 |
//
//

interface INet {
  createServer: (c: (socket: ISocket) => void) => any;
  Socket: any;
}

let n: INet | null = null;

if (typeof window === "undefined") {
  n = require("net");
} else {
  const remote = (window as any).require("electron").remote;
  n = remote.require("net");
}

const net = (n as INet);

const ondata = "data";
const onerror = "error";
const onclose = "close";
// const ipv6prefix  = "::ffff:";

export class TCPServer implements ITCPServer {
  private name: string;
  private debug: boolean;
  private port: number;
  private servicesPort: number;
  private server: ISocket | null;
  private connections: TCPConn[] = [];
  private recieve: (msg: IMessage) => void;
  private settings: () => ISettingForTCP;
  private tcpfactory: TCPFactory;

  constructor(
    debug: boolean,
    port: number,
    servicesPort: number,
    name: string,
    settings: () => ISettingForTCP,
    onRecive: (msg: IMessage) => void,
  ) {
    this.debug = debug;
    this.port = port;
    this.servicesPort = servicesPort;
    this.name = name;
    this.settings = settings;
    this.recieve = onRecive;
    this.server = null;
    this.tcpfactory = new TCPFactory();

  }

  public async Start() {
    await new Promise(async (res) => {
      await this.tcpfactory.Init(this.settings, this.recieve, (id: number) => {/* */}, this.debug, this.name);
      this.server = net.createServer(this.connHandler.bind(this));
      this.server!.on(onerror, (err) => {
        if (this.debug) {
          console.log(`${this.name}: TCP server error `, err);
        }
      });
      this.server!.listen(this.port, () => {
        if (this.debug) {
          console.log(`${this.name}: TCP server listening ${this.server!.address().address}:${this.port}`);
        }
        res();
      });
    });
  }

  public async PushDataTo(addr: string, m: string) {
    let c: TCPConn | null;
    c = this.getConnectionByAddr(addr);
    if (!c) {
      c = this.tcpfactory.Create(new net.Socket(), true);
      c.Connect(addr, this.servicesPort);
      this.connections.push((c as TCPConn));
    }
    if (this.debug) {
      console.log(`${this.name}: message sent to ${addr}:${this.servicesPort}`);
    }
    c!.Send(m);
      // c!.socket.connect(this.servicesPort, addr, async () => {
      //   c!.socket.setNoDelay();
      //   if (this.debug) {
      //     console.log(`${this.name}: TCP Client Send message to ${this.servicesPort}`);
      //   }
      //   let keys: {pub: Buffer, priv: Buffer} = {
      //     pub: Buffer.from(""),
      //     priv: Buffer.from(""),
      //   };
      //   try {
      //     keys = await GenerateKeys(this.settings().UserPass);
      //   } catch (e) {
      //     if (this.debug) {
      //       console.log(`${this.name}: TCP cannot create keys for ${addr} - error ${e}`);
      //     }
      //     return;
      //   }
      //   c!.publicKey = keys.pub;
      //   c!.privateKey = keys.priv;
      //   c!.process = connState.KeysGenerated;

      //   const message: IPublicKey = {
      //     Action: Action.PublicKey,
      //     Key: c!.publicKey.toString("utf8"),
      //     NetworkID: this.settings().NetworkID,
      //     Type: MessageType.SystemTCP,
      //   };
      //   c!.socket.write(JSON.stringify(message));
      // });
      // c!.socket.on(ondata, (data: Buffer) => {
      //   if (this.debug) {
      //     console.log(`${this.name}: TCP Client V`);
      //   }
      //   this.recieve(data.toString(), {address: c!.address, port: c!.socket.localPort, connectionID: c!.ID});
      // });
      // c!.socket.on(onclose, () => {
      //   this.popConnection(c!.ID);
      //   if (this.debug) {
      //     console.log(`${this.name}: TCP Socket Connection closed`);
      //   }
      // });
      // return;
    // }
    // const conn: IConnection = (c as IConnection);
    // c!.Send(m);
    // conn.socket.write(m);
  }

  // public HandleSystemMessage(connectionID: number, message: NetworkMessage) {
  //   switch (message.Action) {
  //     case  Action.PublicKey:
  //       this.addRemotePublicKey(connectionID, Buffer.from((message as IPublicKey).Key));
  //       break;
  //     case Action.PublicKeyDelivery:
  //       for (const c of this.connections) {
  //         if (c.ID === connectionID) {
  //           c.process = (c.process === connState.KeyGot ? connState.KeysExchanged : connState.KeyDelivered);
  //           if (c.process === connState.KeysExchanged) {
  //             this.sendMessages(connectionID);
  //           }
  //           break;
  //         }
  //       }

  //   }
  // }

  public Close() {
    this.clearConnections();
    this.server!.close();
  }

  private async connHandler(socket: ISocket) {
    // IPv6 to IPv4
    console.log(`${this.name} - new connection `, socket.remotePort);
    const conn: TCPConn = this.tcpfactory.Create(socket, false);
    this.connections.push(conn);
    // let addr = socket.address().address;
    // if (addr.substr(0, 7) === ipv6prefix) {
    //   addr = addr.substr(7);
    // }
    // if (this.debug) {
    //   console.log(`${this.name}: TCP new connection ${addr}:${socket.remotePort}`);
    // }
    // let keys: {pub: Buffer, priv: Buffer} = {
    //   pub: Buffer.from(""),
    //   priv: Buffer.from(""),
    // };
    // try {
    //   keys = await GenerateKeys(this.settings().UserPass);
    // } catch (e) {
    //   socket.destroy();
    //   if (this.debug) {
    //     console.log(`${this.name}: TCP cannot create keys for ${addr}:${socket.remotePort} - error ${e}`);
    //   }
    //   return;
    // }
    // const conn: IConnection = this.defConnection(this.idcounter++, socket, addr);
    // conn.publicKey = keys.pub;
    // conn.privateKey = keys.priv;
    // conn.process = connState.KeysGenerated;
    // this.connections.push(conn);

    // const message: IPublicKey = {
    //   Action: Action.PublicKey,
    //   Key: conn.publicKey.toString("utf8"),
    //   NetworkID: this.settings().NetworkID,
    //   Type: MessageType.SystemTCP,
    // };
    // conn.socket.write(JSON.stringify(message));
    // // conn.socket
    // // conn.write
    // conn.socket.on(ondata, (message: Buffer) => {
    //   if (this.debug) {
    //     console.log(`${this.name}: TCP Server V from ${addr}:${conn.socket.remotePort}`);
    //   }
    //   this.recieve(message.toString(), {address: addr, port: conn.socket.remotePort, connectionID: conn.ID});
    // });
  }

  private popConnection(id: number) {
    this.connections = this.connections.filter((v) => {
      if (v.ID === id) {
        v.Close();
        return false;
      }
      return true;
    });
  }

  private getConnByNetworkID(networkID: string) {
    for (const c of this.connections) {
      if (c.networkID === networkID) {
        return c;
      }
    }
    return null;
  }

  private getConnectionByAddr(addr: string): TCPConn | null {
    for (const c of this.connections) {
      if (c.address === addr) {
        return c;
      }
    }
    return null;
    // let conn: IConnection | null = null;
    // this.connections.forEach((v) => {
    //   if (conn) {return; }
    //   if (v.address === addr) {
    //     conn = v;
    //   }
    // });
    // return conn;
  }

  private clearConnections() {
    this.connections = this.connections.filter((v) => {
      v.Close();
      return false;
    });
  }

}

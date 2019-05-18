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
//           |      CPublic Key Delivered      |
//           |   <-------------------------    |
//           |                                 |
//           |           SPublic Key           |
//           |   <-------------------------    |
//           |                                 |
//           |      SPublic Key Delivered      |
//           |   ------------------------->    |
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
  }

  public Close() {
    this.clearConnections();
    this.server!.close();
  }

  private async connHandler(socket: ISocket) {
    if (this.debug) {
      console.log(`${this.name} - new connection `, socket.remotePort);
    }
    const conn: TCPConn = this.tcpfactory.Create(socket, false);
    this.connections.push(conn);
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
  }

  private clearConnections() {
    this.connections = this.connections.filter((v) => {
      v.Close();
      return false;
    });
  }

}

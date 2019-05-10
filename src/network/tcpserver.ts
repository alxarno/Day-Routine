import { ITCPServer, IRequestInfo } from "./interfaces";

interface INet {
  createServer: (c: (socket: ISocket) => void) => any;
  Socket: any;
}

let n: INet | null = null;

if (typeof window === "undefined") {
// if (process.env.TEST) {
  n = require("net");
} else {
  const remote = (window as any).require("electron").remote;
  n = remote.require("net");
}

const net = (n as INet);

enum ConnectionStep {
  SocketCreation,
  DataSend,
}

interface ISocket {
  connect: (port: number, addr: string, c: () => void) => void;
  on: (e: string, c: (...data: any[]) => void) => void;
  pipe: (socket: ISocket) => void;
  listen: (port: number, callback: () => void) => void;
  address: () => any;
  write: (mes: string) => void;
  destroy: () => void;
  localAddress: string;
  localPort: number;
  remotePort: number;
  setNoDelay: () => void;
  close: () => void;
}

interface IConnection {
  ID: number;
  socket: ISocket;
  address: string;
  process: ConnectionStep;
}

const ondata = "data";
const onerror = "error";
const onclose = "close";
const ipv6prefix  = "::ffff:";

export class TCPServer implements ITCPServer {
  private name: string;
  private debug: boolean;
  private port: number;
  private servicesPort: number;
  private server: ISocket;
  private idcounter: number = 0;
  private connections: IConnection[] = [];
  private recieve: (msg: string, rinfo: IRequestInfo) => void;
  constructor(
    debug: boolean,
    port: number,
    servicesPort: number,
    name: string,
    onRecive: (msg: string, rinfo: IRequestInfo) => void,
    onError: (err: Error) => void,
    onBinded: () => void,
  ) {
    this.debug = debug;
    this.port = port;
    this.servicesPort = servicesPort;
    this.name = name;
    this.recieve = onRecive;
    this.server = net.createServer((socket: ISocket) => {
      // IPv6 to IPv4
      let addr = socket.address().address;
      if (addr.substr(0, 7) === ipv6prefix) {
        addr = addr.substr(7);
      }
      if (this.debug) {
        console.log(`${this.name}: TCP new connection ${addr}:${socket.remotePort}`);
      }

      const conn: IConnection = {
        address:  addr,
        process: ConnectionStep.SocketCreation,
        socket,
        ID: this.idcounter++,
      };
      this.connections.push(conn);
      conn.socket.on(ondata, (message: Buffer) => {
        if (this.debug) {
          console.log(`${this.name}: TCP Server V from ${conn.address}:${conn.socket.remotePort}`);
        }
        this.recieve(message.toString(), {address: conn.address, port: conn.socket.remotePort});
      });
      // conn.socket.pipe(conn.socket);
    });
    this.server.on(onerror, (err) => {
      if (this.debug) {
        console.log(`${this.name}: TCP server error `, err);
      }
    });
    this.server.listen(this.port, () => {
      if (this.debug) {
        console.log(`${this.name}: TCP server listening ${this.server.address().address}:${this.port}`);
      }
    });
  }

  public PushDataTo(addr: string, m: string) {
    let c: IConnection | null;
    c = this.getConnectionByAddr(addr);
    if (!c) {
      c = {
        address: addr,
        process: ConnectionStep.SocketCreation,
        socket: new net.Socket(),
        ID: this.idcounter++,
      };
      this.connections.push((c as IConnection));
      c.socket.connect(this.servicesPort, addr, () => {
        c!.socket.setNoDelay();
        if (this.debug) {
          console.log(`${this.name}: TCP Client Send message to ${this.servicesPort}`);
        }
        c!.socket.write(m);
      });
      c.socket.on(ondata, (data: Buffer) => {
        if (this.debug) {
          console.log(`${this.name}: TCP Client V`);
        }
        this.recieve(data.toString(), {address: c!.address, port: c!.socket.localPort});
      });
      c.socket.on(onclose, () => {
        this.popConnection(c!.ID);
        if (this.debug) {
          console.log(`${this.name}: TCP Socket Connection closed`);
        }
      });
      return;
    }
    const conn: IConnection = (c as IConnection);

    conn.socket.write(m);
  }

  public Close() {
    this.clearConnections();
    this.server.close();
  }

  private popConnection(id: number) {
    this.connections = this.connections.filter((v) => {
      if (v.ID === id) {
        v.socket.destroy();
        return false;
      }
      return true;
    });
  }

  private getConnectionByAddr(addr: string): IConnection | null {
    let conn: IConnection | null = null;
    this.connections.forEach((v) => {
      if (conn) {return; }
      if (v.address === addr) {
        conn = v;
      }
    });
    return conn;
  }

  private clearConnections() {
    this.connections = this.connections.filter((v) => {
      v.socket.destroy();
      return false;
    });
  }

}

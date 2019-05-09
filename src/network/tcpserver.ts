import { ITCPServer, IRequestInfo } from "./interfaces";

// const remote = (window as any).require("electron").remote;
// const net = remote.require("net");

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
      console.log(`${this.name}: new TCP connection `, addr);
      const conn: IConnection = {
        address:  addr,
        process: ConnectionStep.SocketCreation,
        socket,
        ID: this.idcounter++,
      };
      this.connections.push(conn);
      conn.socket.on(ondata, (message: Buffer) => {
        console.log("TCP Server V");
        this.recieve(message.toString(), {address: conn.address, port: conn.socket.localPort});
      });
      conn.socket.pipe(conn.socket);
    });
    this.server.on(onerror, (err) => {
      console.log("TCP server error ", err);
    });
    this.server.listen(this.port, () => {
      console.log("Opened TCP server on ", "127.0.0.1:" + this.port);
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
        console.log("TCP Client Send message");
        conn.socket.write(m);
      });
      c.socket.on(ondata, (data: Buffer) => {
        console.log("TCP Client V");
        this.recieve(data.toString(), {address: conn.address, port: conn.socket.localPort});
      });
      c.socket.on(onclose, () => {
        this.popConnection(conn.ID);
        console.log("TCP Socket Connection closed");
      });
    }
    const conn: IConnection = (c as IConnection);

    conn.socket.write(m);
    //
    //
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

  // public PushDataTo(addr: string, data: string) {
  //   //
  // }
}

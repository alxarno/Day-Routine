import { ITCPServer, IRequestInfo } from "./interfaces";

const remote = (window as any).require("electron").remote;
const net = remote.require("net");

interface ISocket {
  connect: (port: number, addr: string, c: () => void) => void;
  on: (e: string, c: (...data: any) => void) => void;
  pipe: (socket: ISocket) => void;
  listen: (port: number, callback: () => void) => void;
  address: () => any;
  write: (mes: string) => void;
}

interface IConnection {
  id: number;
  socket: ISocket;
  address: string;
}

export class TCPServer implements ITCPServer {
  public Connection = [];
  private debug: boolean;
  private port: number;
  private server: ISocket;
  private idcounter: number = 0;
  private connections: IConnection[] = [];
  constructor(
    debug: boolean,
    port: number,
    onRecive: (msg: string, rinfo: IRequestInfo) => void,
    onError: (err: Error) => void,
    onBinded: () => void,
  ) {
    this.debug = debug;
    this.port = port;
    this.server = net.createServer((socket: ISocket) => {
      console.log("New TCP connection");
      socket.on("data", (message: Buffer) => {
        console.log("TCP server recieved: ", message.toString(), socket.address().address);
      });
      socket.pipe(socket);
    });
    this.server.on("error", (err) => {
      console.log("TCP server error ", err);
    });
    this.server.listen(this.port, () => {
      console.log("Opened TCP server on ", "127.0.0.1:" + this.port);
    });
  }

  public PushDataTo(addr: string, m: string) {
    const client: ISocket = new net.Socket();
    client.connect(this.port, addr, () => {
      console.log("TCP Socket connected to new TCP connection");
      client.write(m);
    });
    client.on("data", (data: string) => {
      console.log("TCP Socket Recevied: " + data);
    });
    client.on("close", () => {
      console.log("TCP Socket Connection closed");
    });
    //
    //
  }

  public GetDataFrom(addr: string) {
    //
  }

  // public PushDataTo(addr: string, data: string) {
  //   //
  // }
}

import { NetworkMessage } from "./messages";
import { IUDPServer, IRequestInfo } from "./interfaces";

interface IDgram {
  createSocket: (params: any) => any;
}

let d: IDgram | null = null;

if (typeof window === "undefined") {
  d = require("dgram");
} else {
  const remote = (window as any).require("electron").remote;
  d = remote.require("dgram");
}

const dgram = (d as IDgram);

interface IServer {
  bind: (a: number, address: string, c?: () => void) => void;
  on: (t: string, h: (...args: any[]) => void) => void;
  address: () => IRequestInfo;
  send: (buf: Buffer, port: number, address: string, c: (err: Error) => void) => void;
  setBroadcast: (f: boolean) => void;
  close: () => void;
  setMulticastTTL: (a: number) => void;
  addMembership: (addr: string) => void;
}

const MULTICAST_ADDR = "230.1.1.200";

export class UDPServer implements IUDPServer {
  private server: IServer;
  private debug: boolean;
  private port: number;
  private servicesPort: number;
  private name: string;

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
    this.server = dgram.createSocket({ type: "udp4", reuseAddr: true});
    this.server.on("error", onError);
    this.server.on("message", (message: string, rinfo: IRequestInfo) => {
      console.log(`${this.name}: UDP Server Recieve `);
      onRecive(message, rinfo);
    });
    this.server.on("listening", () => {
      const address =  this.server.address();
      if (this.debug) {
        console.log(`${this.name}: UDP server listening ${address.address}:${address.port}`);
      }
      this.server.setBroadcast(true);
      this.server.setMulticastTTL(128);
      this.server.addMembership(MULTICAST_ADDR);
    });
    // console.log(this.server);

    this.server.bind(this.port, "0.0.0.0", () => {

      onBinded();
    });
  }

  public Close() {
    this.server.close();
  }

  public SendMulticast(m: NetworkMessage) {
    const message = Buffer.from(JSON.stringify(m));
    console.log(`${this.name}: UDP server send message to ${this.servicesPort}`);
    this.server.send(message, this.servicesPort, MULTICAST_ADDR, (err: Error) => {
      if (!err) {return; }
      console.log("MultiCast Error - ", err);
    });
  }

  public SendToAddress(m: string, address: string) {
    //
  }

}

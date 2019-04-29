import { Server } from "http";

const remote = (window as any).require("electron").remote;
const dgram = remote.require("dgram");

export interface IRequestInfo {
  address: string;
  port: number;
}

interface IServer {
  bind: (a: number) => void;
  on: (t: string, h: (...args: any[]) => void) => void;
  address: () => IRequestInfo;
}

export class INetworkServer {
  private server: IServer;
  private debug: boolean;

  constructor(
    debug: boolean,
    port: number,
    onRecive: (msg: string, rinfo: IRequestInfo) => void,
    onError: (err: Error) => void,
  ) {
    this.debug = debug;
    this.server = dgram.createSocket("udp4");
    this.server.on("error", onError);
    this.server.on("message", onRecive);
    this.server.on("listening", () => {
      const address =  this.server.address();
      if (this.debug) {
        console.log(`server listening ${address.address}:${address.port}`);
      }
    });
    this.server.bind(port);
  }
}

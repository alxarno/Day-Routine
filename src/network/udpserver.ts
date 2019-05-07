import { Server } from "http";
import { ICore } from "src/interfaces/core";
import { IGreetingMessage, Action, NetworkMessage } from "./messages";
import { IUDPServer, IRequestInfo } from "./interfaces";

const remote = (window as any).require("electron").remote;
const dgram = remote.require("dgram");

interface IServer {
  bind: (a: number, address: string, c?: () => void) => void;
  on: (t: string, h: (...args: any[]) => void) => void;
  address: () => IRequestInfo;
  send: (buf: Buffer, port: number, address: string, c: (err: Error) => void) => void;
  setBroadcast: (f: boolean) => void;
  close: () => void;
}

export class UDPServer implements IUDPServer {
  private server: IServer;
  private debug: boolean;
  private port: number;

  constructor(
    debug: boolean,
    port: number,
    onRecive: (msg: string, rinfo: IRequestInfo) => void,
    onError: (err: Error) => void,
    onBinded: () => void,
  ) {
    this.debug = debug;
    this.port = port;
    this.server = dgram.createSocket("udp4");
    this.server.on("error", onError);
    this.server.on("message", onRecive);
    this.server.on("listening", () => {
      const address =  this.server.address();
      if (this.debug) {
        console.log(`UDP server listening ${address.address}:${address.port}`);
      }

    });
    // console.log(this.server);

    this.server.bind(this.port, "127.0.0.1", () => {
      this.server.setBroadcast(true);
      onBinded();
    });
  }

  public Close() {
    this.server.close();
  }

  public SendMulticast(m: NetworkMessage) {
    const message = Buffer.from(JSON.stringify(m));
    console.log("SendMulticast - ", message);
    this.server.send(message, this.port, "255.255.255.255", (err: Error) => {
      if (!err) {return; }
      console.log("MultiCast Error - ", err);
    });

    // const client = dgram.createSocket("udp4");
    // console.log(client.setBroadcast);
    // client.setBroadcast(true);
    // client.send(message, this.port, "192.168.1.255", (err: Error) => {
    //   console.log(err);
    //   client.close();
    // });
  }

  public SendToAddress(m: string, address: string) {
    //
  }

}

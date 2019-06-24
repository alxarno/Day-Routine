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

export interface INet {
  createServer: (c: (socket: ISocket) => void) => any;
  createSocket: () => ISocket;
}

const getNet = (pack: any) => {
  return {
    createServer: (c: (socket: ISocket) => void) => pack.createServer(c),
    createSocket: () => new (pack.Socket)(),
  };
};

export const net: INet  = (typeof window === "undefined" ?
  getNet(require("net")) :
  getNet((window as any).require("electron").remote.require("net"))
);

// if (typeof window === "undefined") {
//   const netNative = require("net");
//   n = {
//     createServer: (c: (socket: ISocket) => void) => {
//       netNative.createServer(c);
//     },
//     createSocket: () => new netNative.Socket(),
//   };

// } else {
//   const remote = (window as any).require("electron").remote;
//   const netNative = remote.require("net");
//   n = {
//     createServer: (c: (socket: ISocket) => void) => {
//       netNative.createServer(c);
//     },
//     createSocket: () => new netNative.Socket(),
//   };
// }

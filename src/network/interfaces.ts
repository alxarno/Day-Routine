import { NetworkMessage } from "./messages";

export interface IRequestInfo {
  address: string;
  port: number;
  connectionID: number;
}

export interface IUDPServer {
  SendMulticast: (m: NetworkMessage) => void;
  SendToAddress: (m: string, address: string) => void;
  Close: (c: () => void) => void;
}

export interface ITCPServer {
  PushDataTo: (address: string, data: string) => void;
  Start: () => Promise<void>;
  Close: (c: () => void) => void;
}
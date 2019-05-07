import { NetworkMessage } from "./messages";

export interface IRequestInfo {
  address: string;
  port: number;
}

export interface IUDPServer {
  SendMulticast: (m: NetworkMessage) => void;
  SendToAddress: (m: string, address: string) => void;
  Close: () => void;
}

export interface ITCPServer {
  // SendToAddress: (m: string , address: string) => void;
  GetDataFrom: (address: string) => void;
  PushDataTo: (address: string, data: string) => void;
}

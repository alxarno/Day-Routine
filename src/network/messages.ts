export enum Action {
  Request = 1, // Somebody wants anybody's data
  Distribution, // Somebody want share it's data
  SendData,
  NeedData,
}

export enum MessageType {
  Greeting = 1,
  Transfer,
}

export interface IGreetingMessage {
  NetworkID: string;
  Pass: string;
  Action: Action;
  Type: MessageType.Greeting;
}

export interface ISendDataMessage {
  NetworkID: string;
  Pass: string;
  Action: Action.SendData;
  Type: MessageType.Transfer;
  Data: any;
  DBSchemaVersion: string;
}

export interface INeedDataMessage {
  NetworkID: string;
  Pass: string;
  Action: Action.NeedData;
  Type: MessageType.Greeting;
  DBSchemaVersion: string;
}

export type NetworkMessage = IGreetingMessage | ISendDataMessage | INeedDataMessage;

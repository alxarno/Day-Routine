export enum Action {
  Request = 1, // Somebody wants anybody's data
  Distribution, // Somebody want share it's data
  SendData,
  NeedData,
  PublicKey,
  PublicKeyDelivery,
  Ready,
}

export enum MessageType {
  Greeting = 1,
  Transfer,
  SystemTCP,
}

export interface IGreetingMessage {
  NetworkID: string;
  Action: Action;
  Type: MessageType.Greeting;
}

export interface ISendDataMessage {
  NetworkID: string;
  Action: Action.SendData;
  Type: MessageType.Transfer;
  Data: any;
  DBSchemaVersion: string;
}

export interface INeedDataMessage {
  NetworkID: string;
  Action: Action.NeedData;
  Type: MessageType.Greeting;
  DBSchemaVersion: string;
}

export interface IPublicKey {
  NetworkID: string;
  Action: Action.PublicKey;
  Type: MessageType.SystemTCP;
  Key: string;
}

export interface IPublicKeyDelivery {
  NetworkID: string;
  Action: Action.PublicKeyDelivery;
  Type: MessageType.SystemTCP;
}

export interface IReady {
  NetworkID: string;
  Action: Action.Ready;
  Type: MessageType.SystemTCP;
}

export type NetworkMessage = IGreetingMessage | ISendDataMessage | INeedDataMessage | IPublicKey | IReady;

export interface IMessage {
  message: NetworkMessage;
  IP: string;
}

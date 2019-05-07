export enum Action {
  Request = 1,
  Distribution,
}

export enum MessageType {
  Greeting = 1,
}

export interface IGreetingMessage {
  NetworkID: string;
  Pass: string;
  Action: Action;
  Type: MessageType;
}

export type NetworkMessage = IGreetingMessage;

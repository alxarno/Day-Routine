export enum SnackBarType {
  Notifier = 1,
  NewConnection,
  Error,
}

export interface ISnackBarNewConnection {
  NetworkID: string;
  Callback: (answer: boolean) => void;
}

export interface ISnackBarBase {
  Data: string;
}

export type ISnackBarContent = ISnackBarBase | ISnackBarNewConnection;

export interface ISnackBarTimeOut {
  Started: number;
  Timer: NodeJS.Timer;
  Duration: number;
}

export interface ISnackBar {
  ID: number;
  Type: SnackBarType;
  Content: ISnackBarContent;
  TimeOut: ISnackBarTimeOut;
  Hided: boolean;
  Executed: boolean;
}

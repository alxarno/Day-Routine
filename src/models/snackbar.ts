export enum SnackBarType {
  Notifier = 1,
  NewConnection,
  EnterPassword,
  Error,
}

export interface ISnackBarNewConnection {
  SyncID: string;
  Callback: (answer: boolean) => void;
}

export interface ISnackBarEnterPassword {
  SyncID: string;
  Callback: (answer: boolean) => void;
}

export interface ISnackBarBase {
  Data: string;
}

export type ISnackBarContent = ISnackBarBase | ISnackBarNewConnection | ISnackBarEnterPassword;

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

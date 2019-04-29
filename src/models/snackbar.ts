export enum SnackBarType {
  Notifier = 1,
  NewConnection,
  Error,
}

export interface ISnackBarNewConnection {
  Key: string;
  Callback: (answer: boolean) => void;
}

export interface ISnackBarBase {
  Data: string;
}

export type ISnackBarContent = ISnackBarBase | ISnackBarNewConnection;

export interface ISnackBar {
  ID: number;
  Type: SnackBarType;
  Content: ISnackBarContent;
  TimeOut: NodeJS.Timer;
  Hided: boolean;
}

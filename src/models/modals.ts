export enum ModalType {
  SyncPass = 1,
}

export interface ISyncPassModalContent {
  SyncID: string;
  Callback: (pass: string) => void;
}

export type ModalContent = ISyncPassModalContent;

export interface IModal {
  Type: ModalType;
  Content: ModalContent;
}

export interface ICryptoError {
  body: string;
}

export enum KeyType {
  Private = 1,
  Public,
}

export enum FormatType {
  Raw = 1,
  Pem,
}

export interface ICryptoRSAKey {
  encrypt: (data: string) => Promise<string | ICryptoError>;
  decrypt: (data: string) => Promise<string | ICryptoError>;
  export: () => Promise<string | ICryptoError>;
  import: (key: string) => Promise<void | ICryptoError>;
}

export interface ICryptoAESKey {
  encrypt: (data: string, pass: string) => Promise<string | ICryptoError>;
  decrypt: (data: string, pass: string) => Promise<string | ICryptoError>;
}

export interface ICrypto {
  generateRSAKeyPair: () => Promise<{privateKey: ICryptoRSAKey, publicKey: ICryptoRSAKey}>;
  generateAESKey: () => Promise<ICryptoAESKey>;
}

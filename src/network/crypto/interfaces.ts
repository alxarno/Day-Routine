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
  export: () => Promise<string>;
  import: (key: string) => Promise<void | ICryptoError>;
}

// export interface ICryptoKey {
//   export: () => Promise<ArrayBuffer>;
//   nativeKey: () => any;
//   import: (key: string, type: string, algorithm: string) => void;
// }

export interface ICryptoAESKey {
  encrypt: (data: string) => Promise<string | ICryptoError>;
  decrypt: (data: string) => Promise<string | ICryptoError>;
  export: () => Promise<string | ICryptoError>;
  import: (key: string) => Promise<void | ICryptoError>;
}

export interface ICrypto {
  generateRSAKeyPair: () => Promise<{privateKey: ICryptoRSAKey, publicKey: ICryptoRSAKey}>;
  generateAESKey: () => Promise<ICryptoAESKey>;
}

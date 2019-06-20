export interface ICryptoError {
  body: string;
}

export interface ICryptoKey {
  export: () => Promise<ArrayBuffer>;
  nativeKey: () => any;
  importKey: (key: string) => void;
}

export interface ICrypto {
  generateRSAKeyPair: () => Promise<{privateKey: ICryptoKey, publicKey: ICryptoKey}>;
  encryptRSAData: (key: ICryptoKey, data: string) => Promise<string>;
  decryptRSAData: (key: ICryptoKey, data: string) => Promise<string>;
  generateAESKey: () => Promise<ICryptoKey>;
  encryptAESData: (key: ICryptoKey, data: string, pass: string) => Promise<string | ICryptoError>;
  decryptAESData: (key: ICryptoKey, data: string, pass: string) => Promise<string | ICryptoError>;
}

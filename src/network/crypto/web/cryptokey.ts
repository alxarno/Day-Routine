import { ICryptoKey } from "../interfaces";

export class WebCryptoKey implements ICryptoKey {
  private key: CryptoKey;

  constructor(key: CryptoKey) {
    this.key = key;
  }

  public async export() {
    if (this.key.algorithm.name === "RSA-OAEP") {
      return crypto.subtle.exportKey("pkcs8", this.key);
    } else {
      return new Uint8Array();
    }
  }

  public nativeKey() {
    return this.key;
  }

  public importKey(key: string) {
    //
  }
}

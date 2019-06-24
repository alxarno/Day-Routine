import { ICryptoRSAKey, KeyType } from "../interfaces";
import { arrayBufferToText, textToArrayBuffer } from "../methods";

export default class RSACryptoKey implements ICryptoRSAKey {
  private type: KeyType;
  private key!: CryptoKey;

  constructor(type: KeyType, key?: CryptoKey) {
    this.type = type;
    if (key) {
      this.key = key;
    }
  }

  public async encrypt(data: string) {
    if (this.type === KeyType.Private) {
      return {body: "You cannot encrypt data by private RSA key"};
    } else {
      const encrypted = await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        this.key,
        textToArrayBuffer(data),
      );
      return arrayBufferToText(encrypted);
    }
  }

  public async decrypt(data: string) {
    if (this.type === KeyType.Public) {
      return {body: "You cannot decrypt data by public RSA key"};
    } else {
      return arrayBufferToText(await crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        this.key,
        textToArrayBuffer(data),
      ));
    }
  }

  public async import(key: string) {
      const binaryKey = this.extractBinaryFromPEM(key, (this.type === 1));
      try {
        this.key = await crypto.subtle.importKey(
          (this.type === 1 ? "pkcs8" : "spki"),
          binaryKey,
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          (this.type === 1 ? ["decrypt"] : ["encrypt"]),
        );
      } catch (e) {
        return {body: `RSA Import key system error: ${e}`};
      }
      return;
  }

  public async export() {
    if (this.type === 1) {
      return {body: `Cannot export RSA private key`};
    }
    const exported = await crypto.subtle.exportKey(
      (this.type === 1 ? "pkcs8" : "spki"),
      this.key,
    );
    return this.binaryToPEM(exported, (this.type === 1));
  }

  private extractBinaryFromPEM(pem: string, priv: boolean): ArrayBuffer {
    const pemHeader = (priv ? "-----BEGIN PRIVATE KEY-----" : "-----BEGIN PUBLIC KEY-----");
    const pemFooter = (priv ? "-----END PRIVATE KEY-----" : "-----END PUBLIC KEY-----");
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    return textToArrayBuffer(binaryDerString);
  }

  private binaryToPEM(buff: ArrayBuffer, priv: boolean): string {
    const pemHeader = (priv ? "-----BEGIN PRIVATE KEY-----" : "-----BEGIN PUBLIC KEY-----");
    const pemFooter = (priv ? "-----END PRIVATE KEY-----" : "-----END PUBLIC KEY-----");
    const exportedAsString = arrayBufferToText(buff);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return `${pemHeader}\n${exportedAsBase64}\n${pemFooter}`;
  }
}

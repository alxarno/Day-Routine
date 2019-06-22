import { FormatType, ICryptoAESKey } from "../interfaces";
import { arrayBufferToText, textToArrayBuffer } from "../methods";

export default class AESCryptoKey implements ICryptoAESKey {
  private key!: CryptoKey;

  constructor(key?: CryptoKey) {
    if (key) {
      this.key = key;
    }
  }

  public async encrypt(data: string) {
  return arrayBufferToText(await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: window.crypto.getRandomValues(new Uint8Array(12)),
      tagLength: 128,
    },
    this.key,
    textToArrayBuffer(data),
  ));
  }

  public async decrypt(data: string) {
    return arrayBufferToText(await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: window.crypto.getRandomValues(new Uint8Array(12)), // CHANGE !!!!
        tagLength: 128,
      },
      this.key,
      textToArrayBuffer(data),
    ));
  }

  public async import(key: string) {
      try {
        this.key = await crypto.subtle.importKey(
          "raw",
          textToArrayBuffer(key),
          "AES-GCM",
          true,
          ["encrypt", "decrypt"],
        );
      } catch (e) {
        return {body: `AES Import key system error: ${e}`};
      }
  }

  public async export() {
    const exported = await crypto.subtle.exportKey(
      "raw",
      this.key,
    );
    return arrayBufferToText(exported);
  }
}

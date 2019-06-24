import { ICryptoAESKey } from "../interfaces";
import { arrayBufferToText, textToArrayBuffer } from "../methods";

export default class AESCryptoKey implements ICryptoAESKey {
  // private key!: CryptoKey;

  constructor(key?: CryptoKey) {
    // if (key) {
    //   this.key = key;
    // }
  }

  public async encrypt(data: string, pass: string) {
    const iv = Buffer.from(crypto.getRandomValues(new Uint8Array(10)));
    const salt = Buffer.from(crypto.getRandomValues(new Uint8Array(64)));

    const keyMaterial = await this.getKeyMaterial(pass);
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt"],
    );

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: 128,
      },
      key,
      textToArrayBuffer(data),
    );
    return Buffer.concat([salt, iv, Buffer.from(encrypted)]).toString("base64");
  }

  public async decrypt(data: string, pass: string) {
    try {
      const bData = Buffer.from(data, "base64");

      const salt = bData.slice(0, 64);
      const iv = bData.slice(64, 80);
      const text = bData.slice(80);

      const keyMaterial = await this.getKeyMaterial(pass);
      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["decrypt"],
      );
      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          tagLength: 128,
        },
        key,
        text,
      );
      return arrayBufferToText(decrypted);
    } catch (e) {
      return {body: `Decription is failed ${e}`};
    }
  }

  private getKeyMaterial(pass: string) {
    const enc = new TextEncoder();
    return crypto.subtle.importKey(
      "raw",
      enc.encode(pass),
     "PBKDF2",
      false,
      ["deriveBits", "deriveKey"],
    );
  }

  // public async import(key: string, pass: string) {
  //     try {
  //       this.key = await crypto.subtle.importKey(
  //         "raw",
  //         textToArrayBuffer(key),
  //         "AES-GCM",
  //         true,
  //         ["encrypt", "decrypt"],
  //       );
  //     } catch (e) {
  //       return {body: `AES Import key system error: ${e}`};
  //     }
  // }

  // public async export() {
  //   const exported = await crypto.subtle.exportKey(
  //     "raw",
  //     this.key,
  //   );
  //   return arrayBufferToText(exported);
  // }
}

import { ICryptoRSAKey, KeyType, FormatType } from "../interfaces";
import { arrayBufferToText, textToArrayBuffer } from "../methods";
import { KeyObject, publicEncrypt, privateDecrypt, createPublicKey } from "crypto";

export default class RSACryptoKey implements ICryptoRSAKey {
  private type: KeyType;
  private key!: KeyObject;

  constructor(type: KeyType, key?: KeyObject) {
    this.type = type;
    if (key) {
      this.key = key;
    }
  }

  public async encrypt(data: string) {
    if (this.type === KeyType.Private) {
      return {body: "You cannot encrypt data by private RSA key"};
    } else if (!this.key) {
      return {body: "RSA key is undefined"};
    } else {
      data = Buffer.from(data).toString("base64");
      const encrypted = publicEncrypt(this.key, Buffer.from(data, "base64"));
      return arrayBufferToText(encrypted);
    }
  }

  public async decrypt(data: string) {
    if (this.type === KeyType.Public) {
      return {body: "You cannot decrypt data by public RSA key"};
    } else if (!this.key) {
      return {body: "RSA key is undefined"};
    } else {
      const decrypted = privateDecrypt(this.key, Buffer.from(textToArrayBuffer(data)));
      return decrypted.toString("utf8");
    }
  }

  public async import(key: string) {
      try {
        // IT"S NOT FOR PRODUCTION, JUST FOR TESTING UP STAGE FUNCS
        this.key = key as any as KeyObject;
      } catch (e) {
        return {body: `RSA Import key system error: ${e}`};
      }
      return;
  }

  public async export() {
    if (this.type === KeyType.Private) {
      return {body: "Exporting a private RSA key is forbidden"};
    }
    return this.key as any;
  }
}

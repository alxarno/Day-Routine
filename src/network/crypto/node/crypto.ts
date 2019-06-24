import { ICrypto, KeyType } from "../interfaces";
const { generateKeyPair } = require("crypto");
import RSACryptoKey from "./rsa";
import AESCryptoKey from "./aes";
import { KeyObject, createPublicKey } from "crypto";

export default  class  NodeCrypto implements ICrypto {
  constructor() {
    //
  }

  public async importRSAKey(key: string) {
    const keyObject = await createPublicKey(key);
    return new RSACryptoKey(KeyType.Public, keyObject);
  }

  public async generateRSAKeyPair() {
    const keypair: {publicKey: KeyObject, privateKey: KeyObject} = await new Promise((res, rej) => {
      generateKeyPair("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      }, (err: Error, publicKey: KeyObject, privateKey: KeyObject) => {
        if (err) {
          rej(err);
        } else {
          res({publicKey, privateKey});
        }
      });
    });
    return {
      privateKey: new RSACryptoKey(KeyType.Private, keypair.privateKey),
      publicKey: new RSACryptoKey(KeyType.Public, keypair.publicKey),
    };
  }

  public async generateAESKey() {
    return new AESCryptoKey();
  }
}

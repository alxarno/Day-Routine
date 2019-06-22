import { ICrypto, KeyType } from "../interfaces";
import RSACryptoKey from "./rsa";
import AESCryptoKey from "./aes";

export default  class  WebCrypto implements ICrypto {
  constructor() {
    //
  }

  public async generateRSAKeyPair() {
    const keypair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {
          name: "SHA-256",
        },
      },
      true,
      ["encrypt", "decrypt"]);
    return {
      privateKey: new RSACryptoKey(KeyType.Private, keypair.privateKey),
      publicKey: new RSACryptoKey(KeyType.Public, keypair.publicKey),
    };
  }

  public async generateAESKey() {
    const key = (await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    ) as CryptoKey);
    return new AESCryptoKey(key);
  }
}

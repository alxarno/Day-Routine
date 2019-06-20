import { ICrypto, ICryptoKey } from "../interfaces";
import { WebCryptoKey } from "./cryptokey";

export default  class  WebCrypto implements ICrypto {
  constructor() {
    //
  }

  public async generateRSAKeyPair() {
    const keypair = (await crypto.subtle.generateKey("RSA-OAEP",  true, []) as CryptoKeyPair);
    return {
      privateKey: new WebCryptoKey(keypair.privateKey),
      publicKey: new WebCryptoKey(keypair.publicKey),
    };
  }

  public async encryptRSAData(key: ICryptoKey, data: string) {
    return arrayBufferToText(await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
        iv: new Uint8Array([1, 0, 1]),
      },
      key.nativeKey(),
      textToArrayBuffer(data),
    ));
  }

  public async decryptRSAData(key: ICryptoKey, data: string) {
    return arrayBufferToText(await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
        iv: new Uint8Array([1, 0, 1]),
      },
      key.nativeKey(),
      textToArrayBuffer(data),
  ));
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
    return new WebCryptoKey(key);
  }

  public async encryptAESData(key: ICryptoKey, data: string, pass: string) {
    return arrayBufferToText(
      await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: textToArrayBuffer(pass),
          additionalData: new ArrayBuffer(0),
          tagLength: 128,
        },
        key.nativeKey(),
        textToArrayBuffer(data),
      ),
    );
  }

  public async decryptAESData(key: ICryptoKey, data: string, pass: string) {
    return "";
    //
  }
}

import WebCrypto from "./crypto";
import RSACryptoKey from "./rsa";
import { KeyType, ICrypto } from "../interfaces";
import AESCryptoKey from "./aes";

export default async () => {
  const crypto = new WebCrypto();
  RSATest(crypto);
  AESTest(crypto);
};

async function RSATest(crypto: ICrypto) {
   // Basic encryption
   const rsaKeys = await crypto.generateRSAKeyPair();
   const encrypted = await rsaKeys.publicKey.encrypt("Hello") as string;
   const decrypted = await rsaKeys.privateKey.decrypt(encrypted);
   if (decrypted !== "Hello") {
     throw new Error(`RSA Decrypted equal ${decrypted} , but should 'Hello'`);
   }

    // Export/Import
   const exportedKey = await rsaKeys.publicKey.export() as string;
   const publicKey = new RSACryptoKey(KeyType.Public);
   await publicKey.import(exportedKey);
   const encryptedByImported = await publicKey.encrypt("Hello") as string;
   const decryptedByImported = await rsaKeys.privateKey.decrypt(encryptedByImported);
   if (decryptedByImported !== "Hello") {
    throw new Error(`RSA Decrypted by imported key equal ${decryptedByImported} , but should 'Hello'`);
  }
}

async function AESTest(crypto: ICrypto) {
  // Basic encryption
  const aesKey = await crypto.generateAESKey();
  const encrypted = await aesKey.encrypt("Hello", "1111") as string;
  const decrypted = await aesKey.decrypt(encrypted, "1111") as string;
  if (decrypted !== "Hello") {
    throw new Error(`AES Decrypted equal ${decrypted} , but should 'Hello'`);
  }

  const faildecrypted = await aesKey.decrypt(encrypted, "2222") as string;
  if (faildecrypted === "Hello") {
    throw new Error(`AES Fail Decrypted equal 'Hello' but shouldn't `);
  }

}

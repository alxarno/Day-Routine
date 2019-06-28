import WebCrypto from "./crypto";
import RSACryptoKey from "./rsa";
import { KeyType, ICrypto } from "../interfaces";

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
  const plaintext = `
  {
    "nc:PersonAgeMeasure": {
      "nc:MeasureIntegerValue": 14,
      "nc:TimeUnitCode": "Русский"
    },
    "j:PersonHairColorCode": "BRO",
    "nc:PersonName": {
      "nc:PersonGivenName": "Mortimer",
      "nc:PersonSurName": "Smith",
      "nc:PersonNameSuffixText": "Sr",
      "nc:PersonPreferredName": "Morty"
    }
  }
  `;

  // Basic encryption
  const aesKey = await crypto.generateAESKey();
  const encrypted = await aesKey.encrypt(plaintext, "1111") as string;
  const decrypted = await aesKey.decrypt(encrypted, "1111") as string;
  if (decrypted !== plaintext) {
    throw new Error(`AES Decrypted equal ${decrypted} , but should ${plaintext}`);
  }

  const faildecrypted = await aesKey.decrypt(encrypted, "2222") as string;
  if (faildecrypted === plaintext) {
    throw new Error(`AES Fail Decrypted equal ${plaintext} but shouldn't `);
  }
  const newAesKey = await crypto.generateAESKey();
  const newKeyDecrypted = await newAesKey.decrypt(encrypted, "1111") as string;
  if (newKeyDecrypted !== plaintext) {
    throw new Error(`AES Decrypted equal ${newKeyDecrypted} , but should ${plaintext}`);
  }

}

import WebCrypto from "./crypto";
import RSACryptoKey from "./rsa";
import { KeyType } from "../interfaces";

export default async () => {
  const crypto = new WebCrypto();
  const rsaKeys = await crypto.generateRSAKeyPair();
  // Basic encryption
  const encrypted = await rsaKeys.publicKey.encrypt("Hello") as string;
  const decrypted = await rsaKeys.privateKey.decrypt(encrypted);
  if (decrypted !== "Hello") {
    throw new Error(`Decrypted equal ${decrypted} , but should 'Hello'`);
  }

  // Export/Import
  const exportedKey = await rsaKeys.publicKey.export();
  const publicKey = new RSACryptoKey(KeyType.Public);
  await publicKey.import(exportedKey);
  const encryptedByImported = await publicKey.encrypt("Hello") as string;
  const decryptedByImported = await rsaKeys.privateKey.decrypt(encryptedByImported);
  if (decryptedByImported !== "Hello") {
    throw new Error(`Decrypted by imported key equal ${decryptedByImported} , but should 'Hello'`);
  }
};

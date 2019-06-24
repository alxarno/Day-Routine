import { ICryptoAESKey } from "../interfaces";
import { randomBytes, pbkdf2Sync, createCipheriv, createDecipheriv} from "crypto";

export default class AESCryptoKey implements ICryptoAESKey {
  public async encrypt(data: string, pass: string) {
    const salt = randomBytes(64);
    const iv =  randomBytes(16);
    // if (pass) {
    const key = pbkdf2Sync(pass, salt, 2145, 32, "sha512");
    const cipher = createCipheriv("aes-256-gcm", key, iv);

    const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
    const tag = (cipher as any).getAuthTag();
    return Buffer.concat([salt, iv, tag, encrypted]).toString("base64");
  }

  public async decrypt(data: string, pass: string) {
    try {
      // base64 decoding
      const bData = Buffer.from(data, "base64");
      // convert data to buffers
      const salt = bData.slice(0, 64);
      const iv = bData.slice(64, 80);
      const tag = bData.slice(80, 96);
      const text = bData.slice(96);

      const key =  pbkdf2Sync(pass, salt , 2145, 32, "sha512");
      // AES 256 GCM Mode
      const decipher = createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(tag);
      // encrypt the given text
      const decrypted = decipher.update((text as any), "binary", "utf8") + decipher.final("utf8");

      return decrypted;
    } catch (e) {
      return {body: `Decryption failed ${e}`};
    }
  }

}

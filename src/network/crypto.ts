import { generateKey, encryptData, exportPublicKey, exportPrivateKey, decryptData } from "./crypto-methods";

interface ICipher {
  update: (data: string | Buffer, inputEncoding: string, outputEncoding: string) => string;
  final: (outputEncoding: string) => string;
}

interface IHash {
  update: (data: string, inputEncoding?: string) => IHash;
  digest: (encoding: string) => string;
}

// interface ICrypto {
//   generateKeyPair: (type: string, options: any,
//                     callback: (err: Error, pubKey: Buffer, privKey: Buffer) => void) => void;
//   publicEncrypt: (key: string | Buffer | object, buff: Buffer) => Buffer;
//   privateDecrypt: (key: string | Buffer | object, buff: Buffer) => Buffer;
//   createCipheriv: (algorithm: string, password: string,  iv: string) => ICipher;
//   createDecipheriv: (algorithm: string, key: string, iv: string) => ICipher;
//   randomBytes: (size: number) => Buffer;
//   createHash: (algorithm: string) => IHash;
// }

// let c: ICrypto | null = null;

// if (typeof window === "undefined") {
//   c = require("crypto");
// } else {
//   const remote = (window as any).require("electron").remote;
//   c = remote.require("crypto");
// }

// const cry: ICrypto = (c as ICrypto);

async function GenerateKeys(): Promise<CryptoKeyPair> {
  return (await generateKey({
    extractable: true,
    hash: {
      name: "SHA-256",
    },
    modulusLength: 2048,
    name: "RSA-OAEP",
    publicExponent: new Uint8Array([1, 0, 1]),
  }, ["encrypt", "decrypt"]) as CryptoKeyPair);
}

async function publickKeyToPem(keys: CryptoKeyPair): Promise<string> {
  return exportPublicKey(keys);
}

async function privateKeyToPem(keys: CryptoKeyPair): Promise<string> {
  return exportPrivateKey(keys);
}

async function PubDecrypt(toDecrypt: string, priv: CryptoKey) {
  return decryptData(new Uint8Array([1, 0, 1]), priv, toDecrypt);
  // return cry.privateDecrypt({key: priv, passphrase}, buffer);
}

async function PubEncrypt(toEncrypt: string, pub: CryptoKey) {
  return encryptData(new Uint8Array([1, 0, 1]), pub, toEncrypt);
  // const buffer: Buffer = Buffer.from(toEncrypt);
  // return cry.publicEncrypt({key: pub, passphrase}, buffer);
}

function Encrypt(text: string, secret: string): string {
  // const key = cry.createHash("sha256").update(secret).digest("base64").substr(0, 32);
  // const iv =  cry.randomBytes(16).toString("hex").slice(0, 16);
  // const cipher = cry.createCipheriv("aes-256-ctr", key, iv);
  // let crypted = cipher.update(text, "utf8", "hex");
  // crypted += cipher.final("hex");
  // return iv + ":" + crypted;
  return "";
}

function Decrypt(text: string, secret: string): string {
  return "";
  // const key = cry.createHash("sha256").update(secret).digest("base64").substr(0, 32);
  // const iv = text.split(":")[0];
  // const decipher = cry.createDecipheriv("aes-256-ctr", key, iv);
  // let dec = decipher.update(text.split(":")[1], "hex", "utf8");
  // dec += decipher.final("utf8");
  // return dec;
}

export {GenerateKeys, PubEncrypt, PubDecrypt, Encrypt, Decrypt, publickKeyToPem, privateKeyToPem};

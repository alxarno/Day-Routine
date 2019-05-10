import { generateKeyPair } from "crypto";

interface IDiffieHellman {
  generateKeys: (encode: string) => void;
  getPublicKey: (encode?: string) => Buffer | string;
  getPrivateKey: (encode?: string) => Buffer | string;
}

interface ICrypto {
  createDiffieHellman: (len: number) => IDiffieHellman;
  generateKeyPair: (type: string, options: any,
                    callback: (err: Error, pubKey: Buffer, privKey: Buffer) => void) => void;
  publicEncrypt: (key: string | Buffer, buff: Buffer) => Buffer;
  privateDecrypt: (key: string | Buffer, buff: Buffer) => Buffer;
}

let c: ICrypto | null = null;

if (typeof window === "undefined") {
  c = require("crypto");
} else {
  const remote = (window as any).require("electron").remote;
  c = remote.require("crypto");
}

const cry: ICrypto = (c as ICrypto);

function GenerateKeys(): Promise<{pub: Buffer, priv: Buffer}> {

  // const primeLength = 300;
  // const diffHell = cry.createDiffieHellman(primeLength);
//
  // diffHell.generateKeys("base64");
  //
  // console.log("Public Key : " , diffHell.getPublicKey("base64"));
  // console.log("Private Key : " , diffHell.getPrivateKey("base64"));
//
  // console.log("Public Key : " , diffHell.getPublicKey("hex"));
  // console.log("Private Key : " , diffHell.getPrivateKey("hex"));
  return new Promise((res, rej) => {
    cry.generateKeyPair("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding : {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "Bingo",
      },
    },
    (err: Error, pubKey: Buffer, privKey: Buffer) => {
      res({pub: pubKey, priv: privKey});
    },
    );
  });
  // return {
    // pub: diffHell.getPublicKey() as Buffer  ,
    // /priv: diffHell.getPrivateKey() as Buffer,
  // };
}

function Decrypt(toDecrypt: string, priv: Buffer) {
  const buffer: Buffer = Buffer.from(toDecrypt, "base64");
  const encrypted = cry.privateDecrypt(priv, buffer);
  return encrypted.toString("utf8");
}

function Encrypt(toEncrypt: string, pub: Buffer) {
  const buffer: Buffer = Buffer.from(toEncrypt);
  const encrypted = cry.publicEncrypt(pub, buffer);
  return encrypted.toString("base64");
}

// GenerateKeys();
(function() {
  GenerateKeys().then((v) => console.log(Buffer.byteLength(v.priv)));
  // const keys = GenerateKeys();
  // const encrypt = Encrypt("Hello", keys.pub);
  // console.log(`Encrypted - ${encrypt}`);
  // const decrypt = Decrypt(encrypt, keys.priv);
  // console.log(`Decrypted - ${decrypt} == Hello`);
})();

// export {GenerateKeys, Encrypt, Decrypt;}

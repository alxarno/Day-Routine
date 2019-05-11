interface ICrypto {
  generateKeyPair: (type: string, options: any,
                    callback: (err: Error, pubKey: Buffer, privKey: Buffer) => void) => void;
  publicEncrypt: (key: string | Buffer | object, buff: Buffer) => Buffer;
  privateDecrypt: (key: string | Buffer | object, buff: Buffer) => Buffer;
}

let c: ICrypto | null = null;

if (typeof window === "undefined") {
  c = require("crypto");
} else {
  const remote = (window as any).require("electron").remote;
  c = remote.require("crypto");
}

const cry: ICrypto = (c as ICrypto);

function GenerateKeys(passphrase: string): Promise<{pub: Buffer, priv: Buffer}> {
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
        passphrase,
      },
    },
    (err: Error, pubKey: Buffer, privKey: Buffer) => {
      res({pub: pubKey, priv: privKey});
    },
    );
  });
}

function Decrypt(buffer: Buffer, priv: Buffer, passphrase: string) {
  return cry.privateDecrypt({key: priv, passphrase}, buffer);
}

function Encrypt(toEncrypt: string, pub: Buffer, passphrase: string) {
  const buffer: Buffer = Buffer.from(toEncrypt);
  return cry.publicEncrypt({key: pub, passphrase}, buffer);
}

export {GenerateKeys, Encrypt, Decrypt };

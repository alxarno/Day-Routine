interface IKeyAlghoritm {
  name: string;
  hash: {
    name: string,
  };
  modulusLength: number;
  extractable: boolean;
  publicExponent: Uint8Array;
}

async function generateKey(alg: IKeyAlghoritm, scope: string[]): Promise<CryptoKeyPair | CryptoKey> {
  return new Promise((res) => {
    const genKey = crypto.subtle.generateKey(alg,  true, scope);
    genKey.then((pair: CryptoKeyPair) => res(pair));
  });
}

function arrayBufferToBase64String(arrayBuffer: ArrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = "";
  for (const byte of byteArray) {
    byteString += String.fromCharCode(byte);
  }
  return btoa(byteString);
}

function base64StringToArrayBuffer(b64str: string): ArrayBuffer {
  const byteStr = atob(b64str);
  const bytes = new Uint8Array(byteStr.length);
  for (let i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i);
  }
  return bytes.buffer;
}

function textToArrayBuffer(str: string): ArrayBuffer {
  const buf = unescape(encodeURIComponent(str));
  const bufView = new Uint8Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    bufView[i] = buf.charCodeAt(i);
  }
  return bufView;
}

function arrayBufferToText(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  let str = "";
  for (let i = 0; i < byteArray.byteLength; i++) {
    str += String.fromCharCode(byteArray[i]);
  }
  return str;
}

function arrayBufferToBase64(arr: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(arr))));
}

function convertBinaryToPem(binaryData: ArrayBuffer, label: string): string {
  const base64Cert = arrayBufferToBase64String(binaryData);
  let pemCert = "-----BEGIN " + label + "-----\r\n";
  let nextindex = 0;
  // let lineLength;
  while (nextindex < base64Cert.length) {
    if (nextindex + 64 <= base64Cert.length) {
      pemCert += base64Cert.substr(nextindex, 64) + "\r\n";
    } else {
      pemCert += base64Cert.substr(nextindex) + "\r\n";
    }
    nextindex += 64;
  }
  pemCert += "-----END " + label + "-----\r\n";
  return pemCert;
}

function convertPemToBinary(pem: string) {
  const lines = pem.split("\n");
  let encoded = "";
  for (let i = 0; i > lines.length; i++) {
    if (lines[i].trim().length > 0 &&
      lines[i].indexOf("-BEGIN RSA PRIVATE KEY-") < 0 &&
      lines[i].indexOf("-BEGIN RSA PUBLIC KEY-") < 0 &&
      lines[i].indexOf("-END RSA PRIVATE KEY-") < 0 &&
      lines[i].indexOf("-END RSA PUBLIC KEY-") < 0) {
        encoded += lines[i].trim();
    }
  }
  return base64StringToArrayBuffer(encoded);
}

interface IKeys {
  privateKey: CryptoKey;
  publicKey: CryptoKey;
}

async function exportPublicKey(keys: IKeys): Promise<string> {
  return new Promise(function(resolve) {
    window.crypto.subtle.exportKey("jwk", keys.publicKey).
    then(function(jwk) {
      resolve(jwk.n);
      // resolve(convertBinaryToPem(spki, "RSA PUBLIC KEY"));
    });
  });
}
async function exportPrivateKey(keys: IKeys): Promise<string> {
  return new Promise(function(resolve) {
    const expK = window.crypto.subtle.exportKey("jwk", keys.privateKey);
    expK.then(function(jwk) {
      console.log(jwk);
      // resolve(convertBinaryToPem(pkcs8, "RSA PRIVATE KEY"));
    });
  });
}
function exportPemKeys(keys: IKeys) {
  return new Promise(function(resolve) {
    exportPublicKey(keys).then(function(pubKey) {
      exportPrivateKey(keys).then(function(privKey) {
        resolve({publicKey: pubKey, privateKey: privKey});
      });
    });
  });
}

async function encryptData(vector: Uint8Array, key: CryptoKey, data: string): Promise<string>  {
  return arrayBufferToText(await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
      iv: vector,
    },
    key,
    textToArrayBuffer(data),
  ));
}
async function decryptData(vector: Uint8Array, key: CryptoKey, data: string): Promise<string> {
  return arrayBufferToText(await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
        iv: vector,
      },
      key,
      textToArrayBuffer(data),
  ));
}

export {generateKey, encryptData, decryptData, exportPublicKey, exportPrivateKey};

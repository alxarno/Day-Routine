import {NodeCrypto, RSACryptoKey} from "./index";
import { KeyType } from "../interfaces";

test("Basic RSA node crypto", async () => {
  const debug = false;
  const crypto = new NodeCrypto();
  const keys = await crypto.generateRSAKeyPair();

  // Supporting utf-8
  const encrypted = await keys.publicKey.encrypt("Привет") as string;
  if (debug) {
    console.log(`Encrypted - ${encrypted}`);
  }
  const decrypted = await keys.privateKey.decrypt(encrypted) as string;

  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }

  expect(decrypted).toEqual("Привет");
});

test("Node RSA crypto export/import", async () => {
  const debug = false;
  const crypto = new NodeCrypto();
  const keys = await crypto.generateRSAKeyPair();
  const exported = await keys.publicKey.export();
  if (debug) {
    console.log(`Exported - ${exported}`);
  }
  const importedKey = new RSACryptoKey(KeyType.Public);
  const answer = await importedKey.import(exported);
  if (answer) {
    console.log(`Importing key is failed - ${answer.body}`);
    throw new Error(answer.body);
  }

  const encrypted = await importedKey.encrypt("Привет") as string;
  if (debug) {
    console.log(`Encrypted - ${encrypted}`);
  }
  const decrypted = await keys.privateKey.decrypt(encrypted) as string;

  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }

  expect(decrypted).toEqual("Привет");
});

test("Node AES crypto", async () => {
  const debug = false;
  const crypto = new NodeCrypto();

  const key = await crypto.generateAESKey();
  const encrypted = await key.encrypt("Привет", "1111") as string;
  if (debug) {
    console.log(`Encrypted - ${encrypted}`);
  }
  const decrypted = await key.decrypt(encrypted, "1111") as string;
  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }
  expect(decrypted).toEqual("Привет");
  const faildecrypted = await key.decrypt(encrypted, "2222") as string;
  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }
  expect(faildecrypted).not.toEqual("Привет");
});

test("Node AES different keys, but same pass", async () => {
  const debug = false;
  const crypto = new NodeCrypto();

  const enckey = await crypto.generateAESKey();
  const encrypted = await enckey.encrypt("Привет", "1111") as string;
  if (debug) {
    console.log(`Encrypted - ${encrypted}`);
  }
  const deckey = await crypto.generateAESKey();
  const decrypted = await deckey.decrypt(encrypted, "1111") as string;
  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }
  expect(decrypted).toEqual("Привет");

  const falsedeckey = await crypto.generateAESKey();
  const falsedecrypted = await falsedeckey.decrypt(encrypted, "2222") as string;
  if (debug) {
    console.log(`Decrypted - ${decrypted}`);
  }
  expect(falsedecrypted).not.toEqual("Привет");
});

import Network from "..";
import { ISettings } from "src/interfaces/settingsStore";
import { BasicAction, SyncTest } from "./sync";
import { GenerateKeys, Encrypt, Decrypt, PubEncrypt, PubDecrypt } from "../crypto";

const PORT_TCP_1 = 42816; // FIRST TCP TEST SERVER PORT
const PORT_UDP_1 = 42814; // FIRST UDP TEST SERVER PORT

const PORT_TCP_2 = 43816; // SECOND TCP TEST SERVER PORT
const PORT_UDP_2 = 43814; // SECOND UDP TEST SERVER PORT

/**
 * @jest-environment node
 */

beforeAll(() => {
  process.env = {...process.env,  TEST: true};
// window = new Window();
});

const s1 = (): ISettings => {
  return {
    DeadZoneNotifications: false,
    NetworkID: "2228-8889",
    Notifications: false,
    RecieveDataFromUnknow: true,
    UserPass: "Bingo1",
  };
};

const s2 = (): ISettings => {
  return {
    DeadZoneNotifications: false,
    NetworkID: "2228-8009",
    Notifications: false,
    RecieveDataFromUnknow: true,
    UserPass: "Bingo2",
  };
};

const data1 = "Data 1";
const data2 = "Data 2";

const timeOut = (fn: () => void) => setTimeout(fn, 500);
const t = () =>  new Promise((res) => timeOut(res));

let basicRequestDone = false;

test("Basic crypto", async () => {
  const debug = false;
  const passphrase = "Bingo";
  const keys = await GenerateKeys(passphrase);
  const encrypt = PubEncrypt("Hello", keys.pub, passphrase);
  const decrypt = PubDecrypt(encrypt, keys.priv, passphrase);
  if (debug) {
    console.log(keys.pub.toString("utf8"));
    console.log(keys.priv.toString("utf8"));
  }
  expect(decrypt.toString("utf8")).toEqual("Hello");
});

test("Basic request", async () => {
  const debug = false;
  if (debug) {
    console.log("--------------------------------------------");
  }
  const network1 = new Network("1.1", s1, debug, PORT_TCP_1, PORT_TCP_2, PORT_UDP_1, PORT_UDP_2, "John", false);
  const network2 = new Network("1.1", s2, debug, PORT_TCP_2, PORT_TCP_1, PORT_UDP_2, PORT_UDP_1, "Luci", false);

  const sync1 = new SyncTest(network1, "John", data1, debug);
  const sync2 = new SyncTest(network2, "Luci", data2, debug);

  await new Promise(async (res) => {
    await sync1.Start(BasicAction.None);
    await sync2.Start(BasicAction.Request);
    res();
  });

  await new Promise((res) => setTimeout(res, 5000)).then(async () => {
    const n1 = new Promise((res) => network1.Close(res));
    const n2 = new Promise((res) => network2.Close(res));
    await Promise.all([n1, n2]);
    basicRequestDone = true;
    expect(sync1.Data).toEqual(sync2.Data);
  });
}, 15000);

test("Basic Distribution", async () => {
  // Wait while 'Basic request' done because async tests run concurency and disturb each other
  t().then(async (v) => {
    if (!basicRequestDone) {
      await t();
    }
  });
  await t();
  const debug = false;
  if (debug) {
    console.log("--------------------------------------------");
  }

  const network1 = new Network("1.1", s1, debug, PORT_TCP_1, PORT_TCP_2, PORT_UDP_1, PORT_UDP_2, "John", true);
  const network2 = new Network("1.1", s2, debug, PORT_TCP_2, PORT_TCP_1, PORT_UDP_2, PORT_UDP_1, "Luci", true);

  const sync1 = new SyncTest(network1, "John", data1, debug);
  const sync2 = new SyncTest(network2, "Luci", data2, debug);

  await new Promise(async (res) => {
    await sync1.Start(BasicAction.None);
    await sync2.Start(BasicAction.Distribution);
    res();
  });

  await new Promise((res) => setTimeout(res, 5000)).then(async () => {
    const n1 = new Promise((res) => network1.Close(res));
    const n2 = new Promise((res) => network2.Close(res));
    await Promise.all([n1, n2]);
    expect(sync1.Data).toEqual(sync2.Data);
  });
}, 35000);

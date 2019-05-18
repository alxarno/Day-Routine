import Network from "..";
import { ISettings } from "src/interfaces/settingsStore";
import { BasicAction, SyncTest } from "./sync";
import { GenerateKeys, Encrypt, Decrypt } from "../crypto";

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

const settings1 = (): ISettings => {
  return {
    DeadZoneNotifications: false,
    NetworkID: "2228-8889",
    Notifications: false,
    RecieveDataFromUnknow: true,
    UserPass: "1111",
  };
};

const settings2 = (): ISettings => {
  return {
    DeadZoneNotifications: false,
    NetworkID: "2228-8009",
    Notifications: false,
    RecieveDataFromUnknow: true,
    UserPass: "1111",
  };
};

const data1 = "Data 1";
const data2 = "Data 2";

const timeOut = (fn: () => void) => setTimeout(fn, 500);
const t = () =>  new Promise((res) => timeOut(res));

let basicRequestDone = false;

test("Basic crypto", async () => {
  const passphrase = "Bingo";
  const keys = await GenerateKeys(passphrase);
  const encrypt = Encrypt("Hello", keys.pub, passphrase);
  const decrypt = Decrypt(encrypt, keys.priv, passphrase);
  console.log(keys.pub.toString("utf8"));
  console.log(keys.priv.toString("utf8"));
  expect(decrypt.toString("utf8")).toEqual("Hello");
});

test("Basic request", async () => {
  const debug = false;
  const network1 = new Network("1.1", settings1, debug, PORT_TCP_1, PORT_TCP_2, PORT_UDP_1, PORT_UDP_2, "John");
  const network2 = new Network("1.1", settings2, debug, PORT_TCP_2, PORT_TCP_1, PORT_UDP_2, PORT_UDP_1, "Luci");

  const sync1 = new SyncTest(network1, BasicAction.None, "John", data1);
  const sync2 = new SyncTest(network2, BasicAction.Request,  "Luci", data2);

  await new Promise((res) => setTimeout(res, 5000)).then(() => {
    network1.Close();
    network2.Close();
    basicRequestDone = true;
    expect(sync1.Data).toEqual(sync2.Data);
  });
}, 6000);

test("Basic Distribution", async () => {
  // Wait while 'Basic request' done because async test run concurency and disturb each other
  t().then(async (v) => {
    if (!basicRequestDone) {
      await t();
    }
  });
  await t();

  const debug = false;

  const network1 = new Network("1.1", settings1, debug, PORT_TCP_1, PORT_TCP_2, PORT_UDP_1, PORT_UDP_2, "John");
  const network2 = new Network("1.1", settings2, debug, PORT_TCP_2, PORT_TCP_1, PORT_UDP_2, PORT_UDP_1, "Luci");

  const sync1 = new SyncTest(network1, BasicAction.None, "John", data1);
  const sync2 = new SyncTest(network2, BasicAction.Distribution,  "Luci", data2);

  await new Promise((res) => setTimeout(res, 10000)).then(() => {
    network1.Close();
    network2.Close();
    expect(sync1.Data).toEqual(sync2.Data);
  });
}, 20000);

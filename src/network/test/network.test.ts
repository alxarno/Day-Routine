import Network from "..";
import { ISettings } from "src/interfaces/settingsStore";
import { BasicAction, SyncTest } from "./sync";

// Its random port, more than 1024 reserved ports
let lastport = 42816;
// Generate new PORTS for tests
const ports = () => {
  return new Array(4).fill(0).map((v) => lastport++);
};

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

test("Basic request", async () => {
  const debug = false;
  if (debug) {
    console.log("--------------------------------------------");
  }
  const cPorts = ports();

  const network1 = new Network("1.1", s1, debug,
    cPorts[0], cPorts[2], cPorts[1], cPorts[3], "John", false);
  const network2 = new Network("1.1", s2, debug,
    cPorts[2], cPorts[0], cPorts[3], cPorts[1], "Luci", false);

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
    expect(sync1.Data).toEqual(sync2.Data);
  });
}, 7000);

test("Basic Distribution", async () => {
  const debug = true;
  if (debug) {
    console.log("--------------------------------------------");
  }
  const cPorts = ports();
  const network1 = new Network(
    "1.1", s1, debug, cPorts[0], cPorts[3], cPorts[1], cPorts[4], "John", true);
  const network2 = new Network(
    "1.1", s2, debug, cPorts[3], cPorts[0], cPorts[4], cPorts[1], "Luci", true);

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
}, 7000);

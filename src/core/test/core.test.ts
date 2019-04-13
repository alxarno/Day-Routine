import { IStorage } from "../../interfaces/storage";
import { Storage } from "../../storage";
import SKEmul from "../../storage/test/StorageKernelEmul";
import { IStorageKernel } from "../../interfaces/storageKernel";
import { ICore } from "../../interfaces/core";
import { Core } from "..";
import { CacheLocalStorage } from "../../cache";
import { ICache } from "../../interfaces/cache";
import { OSEmul, ITestOS } from "./os";
import { IOS } from "../../interfaces/os";
import { IRoutine } from "src/models/routines.routine";
import { IDeadZone } from "src/models/dead_zone";
import { INowTask } from "src/models/now.tasks";
import { SettingsStoreEmul } from "./settings";
import { ISettingsStore } from "src/interfaces/settingsStore";

const warehouse: any = {
  statist:
  [
    {ID: 1, routineID: 2, spent: "[0,0,0,2,0,1,3]", lastUpdate: new Date().getTime()},
    {ID: 2, routineID: 3, spent: "[0,1,0,2,3,1,3]", lastUpdate: new Date().getTime()},
  ],
  routines: [
    {ID: 2, actionBody: "https://localhost:8080", actionType: 2, colorScheme: "default",
     describe: "1 desc", hours: 5, name: "Task #1", hoursSpended: 3, minDurationHours: 2},
    {ID: 3, actionBody: "https://localhost:8080", actionType: 2, colorScheme: "orange",
     describe: "2 desc", hours: 12, name: "Task #2", hoursSpended: 7, minDurationHours: 3},
  ],
  dead_zones: [
    {ID: 1, name: "Yet", start: 0, done: 11, enable: 0, disabled_days: "[]"},
  ],
};

const sk: IStorageKernel = new SKEmul(
  {
    delay: 50,
    print: {
      data: false,
      query: false,
    },
  },
  warehouse,
);

const cash: ICache = 	new CacheLocalStorage();
const storage: IStorage = new Storage(sk, cash.Clear.bind(cash));
const os: ITestOS = new OSEmul({delay: 50, print: false});
const settings: ISettingsStore = new SettingsStoreEmul();
const core: ICore = new Core(storage, cash, (os as IOS), settings);

test("Core: Create", async () => {
  expect(core).not.toBe(undefined);
});

test("Core: Get Schedule", async () => {
  const schedule: Array<INowTask | null> = await core.Schedule().Get();
  const routines: INowTask[] = (schedule as INowTask[]).filter((v) => v != null);
  // let r3: number = 0;
  // let r2: number = 0;

  // routines.forEach((r: INowTask) => {(r.ID === 2 ? r2++ : r3++); });
  expect(schedule.length).toBe(10);
  // expect(r3 > r2).toBe(true);
});

test("Core: Settings Export", async () => {
  await core.Settings().Export();
  const {routines, dead_zones } = JSON.parse(os.Data());
  // const expected: any = `{"routines":[{"ID":2,"actionBody":"https://localhost:8080","actionType":2,` +
  //  `"colorScheme":"default","describe":"1 desc","hours":5,"name":"Task #1", hoursSpended: 3, minDurationHours: 2},` +
  //    `{"ID":3,"actionBody":"https://localhost:8080","actionType":2,"colorScheme":"orange"` +
  //    `,"describe":"2 desc","hours":12,"name":"Task #2", hoursSpended: 7, minDurationHours: 3}],` +
  //    `"dead_zones":[{"ID":1,"name":"Yet","start"` +
  //    `:0,"done":11,"enable":false,"disabled_days":[]}]}`;
  // tslint: disable-next-line
  expect(routines.length).toEqual(2);
  expect(dead_zones.length).toEqual(1);
  // console.log(JSON.parse(os.Data()).routines.length);
});

test("Core: Settings Clear All", async () => {
  await core.Settings().ClearAll();
  const routines: IRoutine[] = await core.Routines().Get();
  const deadZones: IDeadZone[] = await core.DeadZones().Get();
  expect(routines.length).toBe(0);
  expect(deadZones.length).toBe(0);
});

test("Core: Settings Import", async () => {
  let routines: any[] = await core.Routines().Get();
  expect(routines.length).toBe(0);
  await core.Settings().Import();
  routines = await core.Routines().Get();
  expect(routines.length).toBe(2);
});

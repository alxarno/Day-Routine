import { IStorageKernel } from "src/interfaces/storageKernel";
import SKEmul from "./StorageKernelEmul";
import { IStorage } from "src/interfaces/storage";
import {Storage} from "../index";
import { IRoutine } from "src/models/routines.routine";

const warehouse: any = {
  statist:
  [
    {ID: 1, routineID: 2, spent: "[0,0,0,2,0,1,3]", lastUpdate: new Date().getTime()},
    {ID: 2, routineID: 3, spent: "[0,1,0,2,3,1,3]", lastUpdate: new Date().getTime()},
  ],
  routines: [
    {ID: 1, actionBody: "https://localhost:8080", actionType: 2, colorScheme: "default",
     describe: "1 desc", hours: 12, name: "Task #1", hoursSpended: 3, minDurationHours: 2},
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

const storage: IStorage = new Storage(sk, () => { /**/});

test("Storage Create", () => {
  expect(sk).not.toBe(undefined);
});

test("Storage: Statistics Get", async () => {
  const result: any[] = await storage.Statistics().Get();
  expect(result.length).toBe(warehouse.statist.length);
});

test("Storage: Statistics Add", async () => {
  await storage.Statistics().Add({routineID: 4, hours: 4});
  const rows: any[] = await storage.Statistics().Get();
  expect(rows.length).toBe(warehouse.statist.length++);
});

test("Storage: Statistics Delete", async () => {
  await storage.Statistics().Delete({ID: 2});
  const rows: any[] = await storage.Statistics().Get();
  // 2 because we added new object early
  expect(rows.length).toBe(2);
});

test("Storage: Routines Get", async () => {
  const result: any[] = await storage.Routines().Get();
  expect(result.length).toBe(warehouse.routines.length);
});

test("Storage: Routines Create", async () => {
  await storage.Routines().Create({
    ID: 0,
    actionBody: "https://localhost:8080",
    actionType: 2,
    colorScheme: "default",
    describe: "2 desc",
    hours: 14,
    name: "Task #2",
    hoursSpended: 2,
    minDurationHours: 1,
  });
  const results: any[] = await storage.Routines().Get();
  expect(results.length).toBe(2);
});

test("Storage: Routine Update", async () => {
  const routine: IRoutine = {
    ID: 1,
    actionBody: "https://localhost:8080",
    actionType: 2,
    colorScheme: "default",
    describe: "1 desc",
    hours: 12,
    name: "Task #1",
    hoursSpended: 0,
    minDurationHours: 1,
  };
  routine.hours = 10;
  await storage.Routines().Update(routine);
  const rows: any[] = await storage.Routines().Get({ID: 1});
  expect(rows[0].hours).toBe(10);
});

test("Storage: Routine Delete", async () => {
  await storage.Routines().Delete({
    ID: 1,
  });
  const rows: any[] = await storage.Routines().Get();
  // 1 because we added one more object to storage early
  expect(rows.length).toBe(1);
});

test("Storage: DeadZone Get", async () => {
  const deadZones: any[] = await storage.DeadZones().Get();
  expect(deadZones.length).toBe(1);
});

test("Storage: DeadZone Create", async () => {
  await storage.DeadZones().Create({ID: 0, name: "Yet 2", start: 2, done: 15, enable: true, disabled_days: []});
  const deadZones: any[] = await storage.DeadZones().Get();
  expect(deadZones.length).toBe(2);
});

test("Stoarge: DeadZone Update", async () => {
  await storage.DeadZones().Update({ID: 1, name: "Yet 25", start: 0, done: 11, enable: 0, disabled_days: "[]"});
  const deadZones: any[] = await storage.DeadZones().Get();
  expect(deadZones[0].name).toBe("Yet 25");
});

test("Storage: DeadZone Delete", async () => {
  await storage.DeadZones().Delete({ID: 1});
  const deadZones: any[] = await storage.DeadZones().Get();
  expect(deadZones.length).toBe(1);
});

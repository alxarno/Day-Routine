import { IStorageKernel } from "src/interfaces/storageKernel";
import SKEmul from "./StorageKernelEmul";
import { IStorage } from "src/interfaces/storage";
import {Storage} from '../index'


let warehouse:any = {
  "statist":
  [
    {ID: 1, routineID:2, spent:"[0,0,0,2,0,1,3]", lastUpdate: new Date().getTime()},
    {ID: 2, routineID:3, spent:"[0,1,0,2,3,1,3]", lastUpdate: new Date().getTime()}
  ],
  "routines":[
    {ID: 1, actionBody: "https://localhost:8080", actionType: 2, colorScheme:"default",
     describe: "1 desc", hours: 12, name: "Task #1"}
  ],
  "dead_zones":[
    {ID:1, name:"Yet", start: 0, done:11, enable: 0, disabled_days:"[]"}
  ]    
}

let sk:IStorageKernel = new SKEmul(
  {
    delay: 50,
    print:{
      data:false,
      query:false
    }
  },
  warehouse
)

let storage:IStorage = new Storage(sk, ()=>{})

test("Storage Create", ()=>{
  expect(sk).not.toBe(undefined)
})

test("Storage: Statistics Get", async()=>{
  let result:Array<any> = await storage.Statistics().Get()
  expect(result.length).toBe(warehouse["statist"].length)
})

test("Storage: Statistics Add", async()=>{
  await storage.Statistics().Add({routineID:4, hours:4})
  let rows:Array<any> = await storage.Statistics().Get()
  expect(rows.length).toBe(warehouse["statist"].length++)
})


test("Storage: Statistics Delete", async()=>{
  await storage.Statistics().Delete({ID:2})
  let rows:Array<any> = await storage.Statistics().Get()
  // 2 because we added new object early
  expect(rows.length).toBe(2)
})
test("Storage: Routines Get", async()=>{
  let result:Array<any> = await storage.Routines().Get()
  expect(result.length).toBe(warehouse["routines"].length)
})

test("Storage: Routines Create", async()=>{
  await storage.Routines().Create({
    ID:0,
    actionBody: "https://localhost:8080", 
    actionType: 2,
    colorScheme:"default",
    describe: "2 desc",
    hours: 14,
    name: "Task #2"
  })
  let results:Array<any> = await storage.Routines().Get()
  expect(results.length).toBe(2)
})

test("Storage: Routine Update", async()=>{
  await storage.Routines().Update({
    ID:1,
    hours: 10
  })
  let rows:Array<any> = await storage.Routines().Get({ID: 1})
  expect(rows[0]["hours"]).toBe(10)
})

test("Storage: Routine Delete", async()=>{
  await storage.Routines().Delete({
    ID: 1
  })
  let rows:Array<any> = await storage.Routines().Get()
  // 1 because we added one more object to storage early
  expect(rows.length).toBe(1)
})

test("Storage: DeadZone Get", async()=>{
  let deadZones:Array<any> = await storage.DeadZones().Get()
  expect(deadZones.length).toBe(1)
})


test("Storage: DeadZone Create", async()=>{
  await storage.DeadZones().Create({ID:0, name:"Yet 2", start: 2, done:15, enable: true, disabled_days:[]})
  let deadZones:Array<any> = await storage.DeadZones().Get()
  expect(deadZones.length).toBe(2)
})

test("Stoarge: DeadZone Update", async()=>{
  await storage.DeadZones().Update({ID:1, name:"Yet 25", start: 0, done:11, enable: 0, disabled_days:"[]"})
  let deadZones:Array<any> = await storage.DeadZones().Get()
  expect(deadZones[0]["name"]).toBe("Yet 25")
})

test("Storage: DeadZone Delete", async()=>{
  await storage.DeadZones().Delete({ID:1})
  let deadZones:Array<any> = await storage.DeadZones().Get()
  expect(deadZones.length).toBe(1)
})

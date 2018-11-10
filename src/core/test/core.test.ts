import { IStorage } from "../../interfaces/storage";
import { Storage } from "../../storage";
import SKEmul from "../../storage/test/StorageKernelEmul";
import { IStorageKernel } from "../../interfaces/storageKernel";
import { ICore } from "../../interfaces/core";
import { Core } from "..";
import { CashLocalStorage } from "../../cache";
import { ICache } from "../../interfaces/cache";
import { OSEmul } from "./os";
import { IOS } from "../../interfaces/os";
import { Routine } from "src/models/routines.routine";

let warehouse:any = {
  "statist":
  [
    {ID: 1, routineID:2, spent:"[0,0,0,2,0,1,3]", lastUpdate: new Date().getTime()},
    {ID: 2, routineID:3, spent:"[0,1,0,2,3,1,3]", lastUpdate: new Date().getTime()}
  ],
  "routines":[
    {ID: 2, actionBody: "https://localhost:8080", actionType: 2, colorScheme:"default",
     describe: "1 desc", hours: 5, name: "Task #1"},
    {ID: 3, actionBody: "https://localhost:8080", actionType: 2, colorScheme:"orange",
     describe: "2 desc", hours: 12, name: "Task #2"} 
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

let cash:ICache = 	new CashLocalStorage()
let storage:IStorage = new Storage(sk, cash.Clear.bind(cash))
let os:IOS = new OSEmul({delay:50, print:false})
let core:ICore = new Core(storage, cash, os)


test("Core: Create",async ()=>{
  expect(core).not.toBe(undefined)
})

test("Core: Get Schedule", async()=>{
  let schedule:Array<Routine|null> = await core.Schedule().Get()
  let routines:Array<Routine> = (schedule as Array<Routine>).filter((v)=>v!=null)
  let r3:number=0
  let r2:number=0

  routines.forEach((r:Routine)=>{(r.ID==2? r2++:r3++)})
  expect(schedule.length).toBe(24)
  expect(r3>r2).toBe(true)
})

test("Core: Settings Clear All", async()=>{
  await core.Settings().ClearAll()
  
})

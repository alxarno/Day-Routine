import {CreateDB} from './database/test/database.test'
import {CreateStorage} from './storage/test/storage.test'

import {Action} from './models/action'
import { Core } from './core/core';

export async function TEST(){
  let db = CreateDB()
  let storage = CreateStorage(db)
  // await storage.DeadZones().Delete({
  //   ID:2
  // })
  // await storage.DeadZones().Create({
  //   disabled_days: [],
  //   start: 23,
  //   done: 7,
  //   enable:true,
  //   ID:-1,
  //   name:"Sleep ZzZ"
  // })
  await storage.Routines().Create({
    ID: -1,
    name: "abc",
    colorScheme: "orange",
    describe: "...",
    hours: 7,
    actionBody: "",
    actionType : Action.File
  })

  //  await storage.Statistics().Add({
  //   routineID: 3,
  //   hours: 5
  // })

  // await db.Table().Drop("smuglers")
  // let table = await db.Table().Create("smuglers", {name:String})
  
  // await table.Insert({name: "ABC"})
  // console.log(await table.Get())
  // await table.Update({ID:1, name:"CBA"})
  // console.log(await table.Get())
  // await table.Delete({name:"CBA"})
  // console.log(await table.Get())
  
}
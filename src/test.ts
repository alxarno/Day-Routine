import {CreateDB} from './database/test/database.test'
import {CreateStorage} from './storage/test/storage.test'

import {Action} from './models/action'

export async function TEST(){
  let db = CreateDB()
  let storage = CreateStorage(db)
  await storage.Routines().Create({
    ID: -1,
    name: "abc",
    colorScheme: "orange",
    describe: "...",
    hours: 0,
    actionBody: "",
    actionType : Action.File
  })
  // await db.Table().Drop("smuglers")
  // let table = await db.Table().Create("smuglers", {name:String})
  
  // await table.Insert({name: "ABC"})
  // console.log(await table.Get())
  // await table.Update({ID:1, name:"CBA"})
  // console.log(await table.Get())
  // await table.Delete({name:"CBA"})
  // console.log(await table.Get())
  
}
import {CreateDB} from './database/test/database.test'


export async function TEST(){
  let db = CreateDB()
  let table = await db.Table().Create("smuglers", {name:String})
  // let table = await db.Table().Get("smuglers")
  await table.Insert({name: "ABC"})
  console.log(await table.Get())
  await table.Delete({name:"ABC"})
  console.log(await table.Get())
  
}
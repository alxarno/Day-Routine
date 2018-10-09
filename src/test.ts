import {CreateDB} from './database/test/database.test'


export async function TEST(){
  let db = CreateDB()
  // let table = db.Table()
  db.Table().Create("smuglers", {name:String})
  let table = await db.Table().Get("smuglers")
}
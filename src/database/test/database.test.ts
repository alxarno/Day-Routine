import {DataBase} from '../index'
import {IStorageKernel} from '../../interfaces/storageKernel'
import { DBEmulator } from './DBEmulator';


let DBDriverEmulator = new DBEmulator({
  correctWork:true,
  delay: 50,
  print:false
})

let db:IStorageKernel = new DataBase(
  {debug:false},
  DBDriverEmulator
)


test('Table available', async() => {
  let table:any = await db.Table()
  expect(table).not.toBe(undefined);
});

test('Table create', async()=>{
  let table = await db.Table().Create("Table1",
   {name:String, hands:Number, born: Date, male: Boolean})
  let expectedValue:string = "CREATE TABLE IF NOT EXISTS"+
  " Table1(ID INTEGER PRIMARY KEY ASC,"+
  " name TEXT, hands INTEGER, born INTEGER, male INTEGER)"
  //console.log("Last querry - ", DBDriverEmulator.LastQuery)
  expect(DBDriverEmulator.LastQuery).toBe(expectedValue)
})
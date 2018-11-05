import {DataBase} from '../index'
import {IStorageKernel} from '../../interfaces/storageKernel'
import { DBEmulator } from './DBEmulator';

const it = require('jest')
const expect = require('jest')

let db:IStorageKernel = new DataBase(
  {debug:false},
  new DBEmulator({correctWork:true, delay: 300})
)


it('Get table', async() => {
  let table:any = await db.Table()
  expect(table).not.toBe(undefined);
});
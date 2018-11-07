import { IStorageKernel } from "src/interfaces/storageKernel";
import SKEmul from "./StorageKernelEmul";



let sk:IStorageKernel = new SKEmul(
  {
    delay: 50,
    print:{
      data:false,
      query:false
    }
  },
  {
    "statist":
    [
      {ID: 1, routineID:2, spent:"[0,0,0,2,0,1,3]", lastUpdate: new Date().getTime()}
    ]
  }
)

test("Storage Create", ()=>{
  expect(sk).not.toBe(undefined)
})
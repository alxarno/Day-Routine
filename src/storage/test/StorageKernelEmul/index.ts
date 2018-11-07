import { IStorageKernel } from "src/interfaces/storageKernel";

interface IPrintLevels{
  query:boolean,
  data:boolean
}

interface ITestParams{
  print:IPrintLevels,
  delay:number
}

export default class SKEmul implements IStorageKernel {
  testParams:ITestParams
  testData:{[key:string]:Array<any>}

  constructor(_testParams:ITestParams, _testData:{[key:string]:Array<any>}){
    this.testParams = _testParams
    this.testData = _testData
  }

  public async Get(table:string, data?:any){
    await new Promise(resolve=>setTimeout(resolve, this.testParams.delay))

  }

  public async Insert(table:string, data:any){
    await new Promise(resolve=>setTimeout(resolve, this.testParams.delay))
    return 0
  }

  public async Update(table:string, data:any){
    await new Promise(resolve=>setTimeout(resolve, this.testParams.delay))

  }
  
  public async Delete(table:string, data:any){
    await new Promise(resolve=>setTimeout(resolve, this.testParams.delay))

  }

  public async TableCreate(name:string, schema:{[key:string]:Object}){
    await new Promise(resolve=>setTimeout(resolve, this.testParams.delay))

  }
}
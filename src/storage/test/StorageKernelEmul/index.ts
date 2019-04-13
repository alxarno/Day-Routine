import { IStorageKernel } from "src/interfaces/storageKernel";

interface IPrintLevels {
  query: boolean;
  data: boolean;
}

interface ITestParams {
  print: IPrintLevels;
  delay: number;
}

export default class SKEmul implements IStorageKernel {
  public testParams: ITestParams;
  public testData: {[key: string]: any[]};
  public lastId: number = 0;

  constructor(testParams: ITestParams, testData: {[key: string]: any[]}) {
    this.testParams = testParams;
    this.testData = testData;

    // I know that lastId is biggest id in whole warehous and not in one of the tables
    Object.keys(testData).forEach((value) => {
      testData[value].forEach((item: {ID: number}) => {
        if (item.ID > this.lastId) {
          this.lastId = item.ID;
        }
      });
    });
  }

  public async Get(table: string, data?: any) {
    await new Promise((resolve) => setTimeout(resolve, this.testParams.delay));
    if (data) {
      const result: any[] = [];
      this.testData[table].forEach((currentValue) => {
        let push: boolean = true;
        Object.keys(data).forEach((key) => {
          if (data[key] !== currentValue[key]) { push = false; }
        });

        if (push) { result.push(currentValue); }
      });
      return {...result};
    }
    return {...this.testData[table]};
  }

  public async Insert(table: string, data: any) {
    await new Promise((resolve) => setTimeout(resolve, this.testParams.delay));
    data.ID = ++this.lastId;
    this.testData[table].push(data);
    return this.lastId;
  }

  public async Update(table: string, data: {[key: string]: any}) {
    await new Promise((resolve) => setTimeout(resolve, this.testParams.delay));
    let done: boolean = false;
    this.testData[table].forEach((currentValue: {ID: number}, index: number) => {
      if (done) { return; }
      if (data.ID === currentValue.ID) {
        const workValue: {[key: string]: any} = currentValue;

        Object.keys(data).forEach((key) => {
          workValue[key] = data[key];
        });

        this.testData[table][index] = workValue;
        done = true;
      }
    });
  }

  public async Delete(table: string, data: {ID: number}) {
    await new Promise((resolve) => setTimeout(resolve, this.testParams.delay));
    this.testData[table] = this.testData[table].filter((v: {ID: number}) => {
      if (v.ID === data.ID) { return false; }
      return true;
    });
  }

  public async TableCreate(name: string, schema: {[key: string]: any}) {
    await new Promise((resolve) => setTimeout(resolve, this.testParams.delay));

  }
}

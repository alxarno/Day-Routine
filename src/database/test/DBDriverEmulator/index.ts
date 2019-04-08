type SQLExecute = (body: string,
                   data: any,
                   callbackSuccess: (tx: any, results: any) => void,
                   callbackError: () => void) => void;

type Executor = (tx: {executeSql: SQLExecute}) => void;

interface IDBEmulator {
  transaction: (callback: Executor) => void;
}

interface IDBEmulatorProps {
  correctWork: boolean;
  delay: number;
  print: boolean;
}

export default class DBEmulator implements IDBEmulator {
  private delay: number;
  private correctWork: boolean;
  private print: boolean;

  private lastQuery: string;
  private lastData: any[];
  private result: any[];
  private error: Error;

  constructor(props: IDBEmulatorProps) {
    this.correctWork = props.correctWork;
    this.delay = props.delay;
    this.print = props.print;

    this.lastData = [];
    this.result = [];
    this.error = new Error();
    this.lastQuery = "";
  }

  public get LastQuery(): string {
    return this.lastQuery;
  }

  public get LastData(): any {
    return this.lastData;
  }

  public set CorrectWork(correctWork: boolean) {
    this.correctWork = correctWork;
  }

  public set Answer(rows: any[]) {
    this.result = rows;
  }

  public async transaction(callback: Executor) {
    callback({executeSql: this.executor.bind(this)});
  }

  private async executor(body: string,
                         data: any,
                         callbackSuccess: (tx: any, results: any) => void,
                         callbackError: () => void) {
    if (this.print) {
      let printString = "DBEmulator executor print:";
      printString += "\n";
      printString += "SQL Query - " + body;
      printString += "\n";
      printString += "Input data - " + String(data);
      console.log(printString);
    }
    this.lastData = data;
    this.lastQuery = body;

    await new Promise((resolve) => setTimeout(resolve, this.delay));
    if (this.correctWork) { callbackSuccess(this, {rows: this.result}); } else {
      throw new Error("DBEmulator: SQL Error");
    }
  }

}

interface SQLExecute{
  (body:string,
   data:any,
   callbackSuccess:{(tx:any, results:any):void},
   callbackError:Function):void
}

interface Executor{
   (tx:{executeSQL:SQLExecute}):void
}

interface IDBEmulator{
  transaction: {(callback:Executor):void}
}

export class DBEmulator implements IDBEmulator{
  private delay:number
  private correctWork:boolean
  private lastQuery:string
  private lastData:Array<any>
  private result:any
  private error:Error

  constructor(props:{correctWork:boolean, delay:number}){
    this.correctWork = props.correctWork
    this.delay = props.delay
  }

  public set Query(query:string){
    this.lastQuery = query
  }

  public set Data(data:Array<any>){
    this.lastData = data
  }

  public set Result(result:any){
    this.result = result
  }

  public set Error(error:Error){
    this.error = error
  }

  public set CorrectWork(correctWork:boolean){
    this.correctWork = correctWork
  }

  public async transaction(callback:Executor){
    callback({executeSQL: this.executor.bind(this)})
  }

  private async executor(body:string,
    data:any,
    callbackSuccess:{(tx:any, results:any):void},
    callbackError:Function){
      
    await new Promise(resolve=>setTimeout(resolve, this.delay))
    if(this.correctWork) callbackSuccess(this, this.result)
    else {
      throw "DBEmulator: SQL Error"
    }  
  } 

}
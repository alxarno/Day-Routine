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

interface IDBEmulatorProps{
  correctWork:boolean
  delay:number
  print:boolean
}

export class DBEmulator implements IDBEmulator{
  private delay:number
  private correctWork:boolean
  private print:boolean

  private lastQuery:string
  private lastData:Array<any>
  private result:any
  private error:Error



  constructor(props:IDBEmulatorProps){
    this.correctWork = props.correctWork
    this.delay = props.delay
    this.print = props.print
  }

  public get LastQuery():string{
    return this.lastQuery
  }

  public get LastData():any{
    return this.lastData
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
    if(this.print){
      let printString = "DBEmulator executor print:"
      printString+="\n"
      printString+="SQL Query - "+ body
      printString+= "\n"
      printString+= "Input data - "+String(data)
      console.log(printString)
    } 
    this.lastData = data
    this.lastQuery = body
    
    await new Promise(resolve=>setTimeout(resolve, this.delay))
    if(this.correctWork) callbackSuccess(this, this.result)
    else {
      throw "DBEmulator: SQL Error"
    }  
  } 

}
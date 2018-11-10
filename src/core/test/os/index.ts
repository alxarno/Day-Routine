import { IOS } from "src/interfaces/os";
import { Routine } from "src/models/routines.routine";

interface OSEmulProps{
  print:boolean,
  delay:number
}

export interface TestOS{
  Data:{():string}
  SetData:{(data:string):void}


  readFile:{(path:string):Promise<any>}
  writeFile:{(path:string, data:string):Promise<any>}
  chooseFile:{():Promise<any>}
  saveFile:{():Promise<string>}

  registerTimerCallbcak:{(f:Function):void}
  registerGetCurrentTask:{(func:{():Routine|null}):void}
}


export class OSEmul implements TestOS{
  private testConfig:OSEmulProps
  private saveNameFile:string = "smth.json"
  private fileData:string = ""

  constructor(config:OSEmulProps){
    this.testConfig= config
  }

  public registerTimerCallbcak(func:Function){

  }

  public registerGetCurrentTask(func:{():Routine|null}){
    
  }

  public Data():string{ return this.fileData}

  public SetData(data:string) { this.fileData = data}

  public async chooseFile(){
    if(this.testConfig.print)console.log("OSEmul: ChooseFile has called")
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.saveNameFile
  }

  public async readFile(){
    if(this.testConfig.print)console.log("OSEmul: readFile has called")
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.fileData
  }

  public async saveFile(){
    if(this.testConfig.print)console.log("OSEmul: SaveFile has called")
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.saveNameFile
  }

  public async writeFile(path:string, data:string){
    if(this.testConfig.print) console.log("OSEmul: WriteFile has called. Args: ", arguments)
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    
    if(path !== this.saveNameFile) throw new Error("Cannot find file")
    this.fileData = data
  }
}
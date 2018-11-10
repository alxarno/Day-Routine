import { IOS } from "src/interfaces/os";
import { Routine } from "src/models/routines.routine";

interface OSEmulProps{
  print:boolean,
  delay:number
}


export class OSEmul implements IOS{
  private testConfig:OSEmulProps
  private saveNameFile:string = "smth.json"
  private fileData:string

  constructor(config:OSEmulProps){
    this.testConfig= config
  }

  public registerTimerCallbcak(func:Function){

  }

  public registerGetCurrentTask(func:{():Routine|null}){
    
  }

  get Data():string{ return this.fileData}

  set Data(data:string) { this.fileData = data}

  public async chooseFile(){
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.saveNameFile
  }

  public async readFile(){
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.fileData
  }

  public async saveFile(){
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    return this.saveNameFile
  }

  public async writeFile(path:string, data:string){
    await new Promise(resolve=>setTimeout(resolve, this.testConfig.delay)) 
    
    if(path !== this.saveNameFile) throw new Error("Cannot find file")
    this.fileData = data
  }
}
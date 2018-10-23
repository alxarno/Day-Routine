import CoreModule from "./module";
import { ISettingsCore } from "src/interfaces/core";
const openFile =  (window as any).require('electron').
  remote.require('./renderer').openFile

const writeFile =  (window as any).require('electron').
  remote.require('./renderer').writeToFile
  
const selectFile =  (window as any).require('electron').
  remote.require('./renderer').fileSelect

export class SettingsCore extends CoreModule implements ISettingsCore{

  public async Import(){
    


    
  }

  public Delete(){

  }

  public async Export(){
    
    let routines = this.storage.Routines().Get()
    let dead_zones = this.storage.DeadZones().Get()
    
    let final:{[key:string]:any} = {}
    Promise.all([routines, dead_zones]).then(result=>{
      final["routines"] =result[0]
      final["dead_zones"] = result[1]
    })
    let fileName = await selectFile()
    writeFile(fileName, JSON.stringify(final))
  }

  public ClearAll(){
    
  }
}
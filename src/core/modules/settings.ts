import CoreModule from "./module";
import { ISettingsCore, IRoutinesCore } from "src/interfaces/core";
import { DeadZone } from "src/models/dead_zone";
const openFile =  (window as any).require('electron').
  remote.require('./renderer').openFile

const writeFile =  (window as any).require('electron').
  remote.require('./renderer').writeToFile
  
const saveFile =  (window as any).require('electron').
  remote.require('./renderer').saveFile

const chooseFile = (window as any).require('electron').
  remote.require('./renderer').chooseFile

export class SettingsCore extends CoreModule implements ISettingsCore{

  public async Import(){
    let path:string = await chooseFile()
    let data:string = await openFile(path[0])


    // Clear old schedule
    let routines = this.storage.Routines().Get()
    let dead_zones = this.storage.DeadZones().Get()
  
    let delQuerys:Array<Promise<void> > = []
    
    await Promise.all([routines, dead_zones]).then(result=>{
      result[0].forEach((element:{ID:string}) => {
        delQuerys.push(this.storage.Routines().Delete({ID: element.ID}))
      });

      result[1].forEach((element:{ID:string}) => {
        delQuerys.push(this.storage.DeadZones().Delete({ID: element.ID}))
      });
    })

    await Promise.all(delQuerys)
    let newData:{routines:Array<any>, dead_zones:Array<any>} = JSON.parse(data)

    newData.routines.forEach((element:any) => {
      this.storage.Routines().Create(element)
    });

    newData.dead_zones.forEach((element:DeadZone) => {
      this.storage.DeadZones().Create(element)
    });
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
    let fileName = await saveFile()
    writeFile(fileName, JSON.stringify(final))
  }

  public ClearAll(){
    
  }
}
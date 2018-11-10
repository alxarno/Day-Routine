import CoreModule from "./module";
import { ISettingsCore, IRoutinesCore } from "src/interfaces/core";
import { DeadZone } from "src/models/dead_zone";

export class SettingsCore extends CoreModule implements ISettingsCore{

  public async Import(){
    let path:string = await this.os.chooseFile()
    let data:string = await this.os.readFile(path[0])


    await this.ClearAll()
  
    let newData:{routines:Array<any>, dead_zones:Array<any>} = JSON.parse(data)

    newData.routines.forEach((element:any) => {
      this.storage.Routines().Create(element)
    });

    newData.dead_zones.forEach((element:DeadZone) => {
      this.storage.DeadZones().Create(element)
    });
  }

  public async Delete(){
    
  }

  public async Export(){
    
    let routines = this.storage.Routines().Get()
    let dead_zones = this.storage.DeadZones().Get()
    
    let final:{[key:string]:any} = {}
    Promise.all([routines, dead_zones]).then(result=>{
      final["routines"] =result[0]
      final["dead_zones"] = result[1]
    })
    let fileName = await this.os.saveFile()
    this.os.writeFile(fileName, JSON.stringify(final))
  }

  public async ClearAll(){
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
  }
}
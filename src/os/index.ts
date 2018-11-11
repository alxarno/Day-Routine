import { IOS } from "src/interfaces/os";
import { IStorage } from "src/interfaces/storage";
import { ICore } from "src/interfaces/core";
import { Routine } from "src/models/routines.routine";
import { Action } from "src/models/action";
// const notifier = window.require('node-notifier')
const Notif =  (window as any).require('electron').remote.require('./renderer').notifAction
const OpenLink =  (window as any).require('electron').remote.require('./renderer').openLink
const ExecFile =  (window as any).require('electron').remote.require('./renderer').executeFile


const readFile =  (window as any).require('electron').
  remote.require('./renderer').openFile

const writeFile =  (window as any).require('electron').
  remote.require('./renderer').writeToFile
  
const saveFile =  (window as any).require('electron').
  remote.require('./renderer').saveFile

const chooseFile = (window as any).require('electron').
  remote.require('./renderer').chooseFile

interface OSProps{
  showNotifs:boolean
}

export class OS implements IOS{
  //private core:ICore
  private props:OSProps
  private nowTimeout: any
  private timeOutCallback: Function 
  private firstCall:boolean

  private getCurrentTask:{():Routine|null}

  constructor(_props:OSProps){
    //this.core = core
    this.props = _props
    this.firstCall = true
    this.timerStart()
  }

  public registerTimerCallbcak(func:Function){
    this.timeOutCallback = func
  }

  public registerGetCurrentTask(func:{():Routine|null}){
    this.getCurrentTask = func
  }

  private async timerStart(){
    let date:Date = new Date()

    this.nowTimeout = setTimeout(this.timerStart,
      (60 - date.getMinutes())*60000)
    
    if(!this.getCurrentTask) return

    let task:Routine|null = this.getCurrentTask()

    if(!this.firstCall){
      if(this.timeOutCallback) this.timeOutCallback(date.getHours())
    }else{
      this.firstCall = false
    }
    if(task != null){
      if (!this.props.showNotifs) return
      this.showNotification((task as Routine).name, (task as Routine).describe)
      switch((task as Routine).actionType){
        case Action.File:
          ExecFile((task as Routine).actionBody)
          break;
        case Action.Link:
          OpenLink((task as Routine).actionBody)
          break;
      }
    }

  }

  private showNotification(t:string, m:string){
    Notif(t,m)
  }

  public saveFile(){
    return saveFile
  }

  public chooseFile(){
    return chooseFile
  }

  public readFile(path:string){
    return readFile(path)
  }

  public writeFile(path:string, data:string){
    return writeFile(path,data)
  }

}
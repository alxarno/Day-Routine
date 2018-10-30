import { IOS } from "src/interfaces/os";
import { IStorage } from "src/interfaces/storage";
import { ICore } from "src/interfaces/core";
import { Routine } from "src/models/routines.routine";
import { Action } from "src/models/action";
// const notifier = window.require('node-notifier')
const Notif =  (window as any).require('electron').remote.require('./renderer').notifAction
const OpenLink =  (window as any).require('electron').remote.require('./renderer').openLink
const ExecFile =  (window as any).require('electron').remote.require('./renderer').executeFile

export class OS implements IOS{
  private core:ICore
  private nowTimeout: any
  constructor(core: ICore){
    this.core = core

    this.timerStart()
  }

  private async timerStart(){
    // console.log("Hello")
    let schedule = await this.core.Schedule().Get()
    let date:Date = new Date()

    if(schedule[date.getHours()] !=null){
      let task:Routine = schedule[date.getHours()] 
      // return
      this.showNotification(task.name,
         task.describe)
      switch(task.actionType){
        case Action.File:
          ExecFile(task.actionBody)
          break;
        case Action.Link:
          OpenLink(task.actionBody)
          break;
      }
    }

    this.nowTimeout = setTimeout(this.timerStart,
    (60 - date.getMinutes())*60000)
  }

  private showNotification(t:string, m:string){
    Notif(t,m)
  }
}
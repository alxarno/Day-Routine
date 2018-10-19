import { IOS } from "src/interfaces/os";
// const notifier = window.require('node-notifier')
const Notif =  window.require('electron').remote.require('./renderer').notifAction

export class OS implements IOS{
  constructor(){
  }

  ShowNotification(t:string, m:string){
    Notif(t,m)
  }
}
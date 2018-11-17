import { ICore } from "src/interfaces/core";

// class ExternalAPI{
//   dayscheduleRequest: Function = function(){}

//   constructor(){

//   }

//   get DaySchedule(){
//     return this.dayscheduleRequest()
//   }
// }
let core: ICore;

function RegisterAPI(c: ICore) {
  core = c;
}

function GetAPI(): ICore {
  if (!core) {
    throw new Error("external.api.ts: Core didn't register");
  }
  return core;
}

export {RegisterAPI, GetAPI};

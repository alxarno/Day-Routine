// class ExternalAPI{
//   dayscheduleRequest: Function = function(){}
//   constructor(){
//   }
//   get DaySchedule(){
//     return this.dayscheduleRequest()
//   }
// }
let core;
function RegisterAPI(c) {
    core = c;
}
function GetAPI() {
    if (!core) {
        throw "external.api.ts: Core didn't register";
    }
    return core;
}
export { RegisterAPI, GetAPI };
//# sourceMappingURL=external.api.js.map
class ExternalAPI{
  dayscheduleRequest: Function = function(){}

  constructor(){

  }

  get DaySchedule(){
    return this.dayscheduleRequest()
  }
}

export default ExternalAPI
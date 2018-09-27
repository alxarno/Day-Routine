const TIME_WRAPPER_PADDING_TOP = 35
const TIME_ELEMENT_HEIGHT = 94

function GetTimes():Array<string>{
  let time:Array<string> = []

  for(let i=0;i<=23;i++){
    let hour:string = String(i)+":00"
    if(i<10){ hour="0"+hour}
    time.push(hour)
  }

  return time
}

function GetScrollTop():number{
  let d = new Date();
  let n = d.getHours();
  return TIME_WRAPPER_PADDING_TOP+
        (TIME_ELEMENT_HEIGHT*(n+1))-
        (document.body.clientHeight/2)
}

function GetCurrentTime():string{
  let d = new Date();
  let h:number = d.getHours()
  let m:number = d.getMinutes()

  let currentTime:string = String(h)+":"
  let minutes:string = String(m) 
  if(h<10){ currentTime="0"+currentTime}
  if(m<10){ minutes="0"+minutes}
  return currentTime+minutes
}

function GetCurrentTimeMarginTop():number{
  let d = new Date();
  let timeNow = d.getHours();
  let m = d.getMinutes()/60;
  timeNow+=m
  return (timeNow*(TIME_ELEMENT_HEIGHT+13.5))+
          TIME_WRAPPER_PADDING_TOP
}

export {GetTimes,
        GetScrollTop,
        GetCurrentTime,
        GetCurrentTimeMarginTop}
const TIME_ELEMENT_HEIGHT = 115;
const TIME_VALUE_ELEMENT_WRONG = 10;

function GetTimes(): string[] {
  const time: string[] = [];

  for (let i = 0; i <= 23; i++) {
    let hour: string = String(i) + ":00";
    if (i < 10) { hour = "0" + hour; }
    time.push(hour);
  }
  return time;
}

function GetScrollTop(): number {
  const d = new Date();
  const n = d.getHours();
  return ((TIME_ELEMENT_HEIGHT) * (n + 1)) -
        (document.body.clientHeight / 2);
}

function GetCurrentTime(): string {
  const d = new Date();
  const h: number = d.getHours();
  const m: number = d.getMinutes();

  let currentTime: string = String(h) + ":";
  let minutes: string = String(m);
  if (h < 10) { currentTime = "0" + currentTime; }
  if (m < 10) { minutes = "0" + minutes; }
  return currentTime + minutes;
}

function GetCurrentTimeMarginTop(): number {
  const d = new Date();
  let timeNow = d.getHours();
  const m = d.getMinutes() / 60;
  timeNow += m;
  return (timeNow * (TIME_ELEMENT_HEIGHT)) - TIME_VALUE_ELEMENT_WRONG;
}

export {GetTimes,
        GetScrollTop,
        GetCurrentTime,
        GetCurrentTimeMarginTop};

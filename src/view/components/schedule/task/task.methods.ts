import {WrapperStyleInterface} from "./task.interfaces";
import {Color} from "src/view/color.themes";

export function CheckCurrentTask(start: number, hours: number): boolean {
  const d = new Date();
  const n = d.getHours();
  if ((start <= n) && (start + hours > n)) {
    return true;
  } else {
    return false;
  }
}

export function ComputeWrapperStyle(
  taskColor: Color,
  taskHours: number,
  currentTaskActive: boolean,
  wrapperStyleBase: WrapperStyleInterface,
): WrapperStyleInterface {
  if (currentTaskActive) {
    wrapperStyleBase.borderLeft = "none";
    wrapperStyleBase.background = taskColor.active_color;
    wrapperStyleBase["--box-shadow-color"] = taskColor.average_color;
  } else {
    wrapperStyleBase.background = taskColor.passiv_color;
    wrapperStyleBase.borderLeft += taskColor.active_color;
  }
  wrapperStyleBase.height = String(taskHours * 94 + taskHours * (taskHours > 1 ? 7 : 0)) + "px";
  return wrapperStyleBase;
}

export function ShortDescribe(describe: string, hours: number): string {
  const lettersPerHour: number = 35;
  let finalDescribe: string = "";
  if (describe.length >= hours * lettersPerHour) {
    finalDescribe = describe.substring(0, lettersPerHour * Math.pow(hours, 2)) + "...";
  } else {
    finalDescribe = describe;
  }
  return finalDescribe;
}

export function StartAndDone(start: number, hours: number): {[key: string]: string} {
  const result = {
    taskStart: "",
    taskDone: "",
  };

  result.taskStart = String(start) + ":00";
  result.taskDone = String(start + hours) + ":00";

  if (start < 10) { result.taskStart = "0" + result.taskStart; }
  if (start + hours < 10) { result.taskDone = "0" + result.taskDone; }
  return result;
}

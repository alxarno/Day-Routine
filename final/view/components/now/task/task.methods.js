export function CheckCurrentTask(start, hours) {
    let d = new Date();
    let n = d.getHours();
    if ((start <= n) && (start + hours > n)) {
        return true;
    }
    else {
        return false;
    }
}
export function ComputeWrapperStyle(taskColor, taskHours, currentTaskActive, wrapperStyleBase) {
    if (currentTaskActive) {
        wrapperStyleBase.borderLeft = "none";
        wrapperStyleBase.background = taskColor.active_color;
        wrapperStyleBase["--box-shadow-color"] = taskColor.average_color;
    }
    else {
        wrapperStyleBase.background = taskColor.passiv_color;
        wrapperStyleBase.borderLeft += taskColor.active_color;
    }
    wrapperStyleBase.height = String(taskHours * 94 + taskHours * (taskHours > 1 ? 7 : 0)) + "px";
    return wrapperStyleBase;
}
export function ShortDescribe(describe, hours) {
    let lettersPerHour = 35;
    let finalDescribe = "";
    if (describe.length >= hours * lettersPerHour) {
        finalDescribe = describe.substring(0, lettersPerHour * Math.pow(hours, 2)) + '...';
    }
    else {
        finalDescribe = describe;
    }
    return finalDescribe;
}
export function StartAndDone(start, hours) {
    let result = {
        taskStart: "",
        taskDone: ""
    };
    result.taskStart = String(start) + ":00";
    result.taskDone = String(start + hours) + ":00";
    if (start < 10)
        result.taskStart = "0" + result.taskStart;
    if (start + hours < 10)
        result.taskDone = "0" + result.taskDone;
    return result;
}
//# sourceMappingURL=task.methods.js.map
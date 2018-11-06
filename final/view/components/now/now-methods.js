const TIME_WRAPPER_PADDING_TOP = 34;
const TIME_ELEMENT_HEIGHT = 94;
const TASK_ELEMENT_HEIGHT = 107.9;
const TASK_WRAPPER_PADDING_TOP = 27;
function GetTimes() {
    let time = [];
    for (let i = 0; i <= 23; i++) {
        let hour = String(i) + ":00";
        if (i < 10) {
            hour = "0" + hour;
        }
        time.push(hour);
    }
    return time;
}
function GetScrollTop() {
    let d = new Date();
    let n = d.getHours();
    return TIME_WRAPPER_PADDING_TOP +
        ((TIME_ELEMENT_HEIGHT + 15) * (n + 1)) -
        (document.body.clientHeight / 2);
}
function GetCurrentTime() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let currentTime = String(h) + ":";
    let minutes = String(m);
    if (h < 10) {
        currentTime = "0" + currentTime;
    }
    if (m < 10) {
        minutes = "0" + minutes;
    }
    return currentTime + minutes;
}
function GetCurrentTimeMarginTop() {
    let d = new Date();
    let timeNow = d.getHours();
    let m = d.getMinutes() / 60;
    timeNow += m;
    return (timeNow * (TASK_ELEMENT_HEIGHT)) + TASK_WRAPPER_PADDING_TOP;
}
function GetNowTasks() {
    let tasks = [];
    for (let i = 0; i < 24; i++) {
        if (i <= 7) {
            tasks.push(null);
            continue;
        }
        if (i == 17) {
            tasks.push({
                name: 'English',
                action: "english.pdf",
                color: "violet",
                describe: `I learn English to find best company
                   in the world which can use my skills
                   to make world better place`,
                hours: 2,
                start: i
            });
            i++;
            continue;
        }
        tasks.push({
            name: 'Math',
            action: "math.pdf",
            color: "orange",
            describe: `I learn math to realize world better and ...`,
            hours: 1,
            start: i
        });
    }
    return tasks;
}
export { GetTimes, GetScrollTop, GetCurrentTime, GetCurrentTimeMarginTop, GetNowTasks };
//# sourceMappingURL=now-methods.js.map
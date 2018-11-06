var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Action } from "src/models/action";
// const notifier = window.require('node-notifier')
const Notif = window.require('electron').remote.require('./renderer').notifAction;
const OpenLink = window.require('electron').remote.require('./renderer').openLink;
const ExecFile = window.require('electron').remote.require('./renderer').executeFile;
export class OS {
    constructor(core, callback) {
        this.core = core;
        this.firstCall = true;
        this.timeOutCallback = callback;
        this.timerStart();
    }
    timerStart() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("Hello")
            let schedule = yield this.core.Schedule().Get();
            let date = new Date();
            if (!this.firstCall) {
                this.timeOutCallback(date.getHours());
            }
            else {
                this.firstCall = false;
            }
            if (schedule[date.getHours()] != null) {
                let task = schedule[date.getHours()];
                return;
                this.showNotification(task.name, task.describe);
                switch (task.actionType) {
                    case Action.File:
                        ExecFile(task.actionBody);
                        break;
                    case Action.Link:
                        OpenLink(task.actionBody);
                        break;
                }
            }
            this.nowTimeout = setTimeout(this.timerStart, (60 - date.getMinutes()) * 60000);
        });
    }
    showNotification(t, m) {
        Notif(t, m);
    }
}
//# sourceMappingURL=index.js.map
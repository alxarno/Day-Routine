import { ScheduleCore } from './modules/schedule';
import { SettingsCore } from "./modules/settings";
import { OS } from "src/os";
export class Core {
    constructor(storage, cash) {
        this.Storage = storage;
        this.Cash = cash;
        this.ScheduleModule = new ScheduleCore({ storage: this.Storage, cash: this.Cash });
        this.SettingsModule = new SettingsCore({ storage: this.Storage });
        this.os = new OS(this, this.HourIsGone);
    }
    // private Cash
    HourIsGone(newHour) {
        // console.log("Hour is gone")
        let schedule = JSON.parse(this.Cash.Get());
        let lastTask = null;
        if (newHour == 0) {
            if (schedule[23]) {
                lastTask = schedule[23];
            }
        }
        else {
            if (schedule[newHour - 1]) {
                lastTask = schedule[newHour - 1];
            }
        }
        if (lastTask)
            this.Storage.Statistics().Add({ hours: 1, routineID: lastTask.ID });
    }
    Routines() {
        return this.Storage.Routines();
    }
    DeadZones() {
        return this.Storage.DeadZones();
    }
    Schedule() {
        return this.ScheduleModule;
    }
    Settings() {
        return this.SettingsModule;
    }
}
//# sourceMappingURL=index.js.map
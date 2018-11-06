var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CoreModule from "./module";
import { RoutinesHoursPerWeekSpent, GetCoefficients, SortRoutinesByFinishingCoefficients } from "./schedule/schedule.methods";
function Copy(d) {
    return Object.assign({}, d);
}
export class ScheduleCore extends CoreModule {
    IsNowDeadZone(dzs, hour) {
        let fin = false;
        dzs.forEach((dz) => {
            if (fin)
                return;
            if (dz.start > dz.done) {
                if (hour >= dz.start || hour < dz.done)
                    fin = true;
            }
            else {
                if (hour >= dz.start && hour < dz.done)
                    fin = true;
            }
        });
        return fin;
    }
    Get() {
        return __awaiter(this, void 0, void 0, function* () {
            let cashShedule = this.cash.Get();
            if (cashShedule == "{}") {
                this.cash.Clear();
            }
            else {
                console.log("Cash Used");
                return JSON.parse(cashShedule);
            }
            let routines = yield this.storage.Routines().Get();
            let activities = yield this.storage.Statistics().Get();
            let deadZones = yield this.storage.DeadZones().Get();
            if (activities.length == 0 && routines.length == 0)
                return [...Array(24)].map(() => null);
            let routineSpentWeek = RoutinesHoursPerWeekSpent(activities);
            let routineSpentWeekCopy = Object.assign({}, routineSpentWeek);
            let routineSpentWeekCoefficients = GetCoefficients(routines, Copy(routineSpentWeek));
            // Sorting routines by "finishing" coefficients
            let routinesSeqSorted = SortRoutinesByFinishingCoefficients(Copy(routineSpentWeekCoefficients));
            // console.log(routinesSeqSorted)
            let finalSchedule = [];
            let IsNowDeadZone = this.IsNowDeadZone;
            let func = function (hour) {
                // console.log(IsNowDeadZone(deadZones, hour))
                if (IsNowDeadZone(deadZones, hour)) {
                    finalSchedule.push(null);
                    return;
                }
                else {
                    let routine = null;
                    routines.forEach((r) => {
                        if (r == null)
                            return;
                        if (r.ID == routinesSeqSorted[0]) {
                            routine = r;
                        }
                    });
                    // routinesSeqSorted)
                    if (routine == null) {
                        finalSchedule.push(null);
                        return;
                    }
                    let froutine = routine;
                    finalSchedule.push({
                        ID: froutine.ID,
                        name: froutine.name,
                        actionBody: froutine.actionBody,
                        actionType: froutine.actionType,
                        color: froutine.colorScheme,
                        describe: froutine.describe,
                        hours: 1,
                        start: hour
                    });
                    routineSpentWeekCopy[froutine.ID]++;
                    routineSpentWeekCoefficients = GetCoefficients(routines, Copy(routineSpentWeekCopy));
                    // console.log(routineSpentWeekCoefficients)
                    // Rebuild 
                    routinesSeqSorted = SortRoutinesByFinishingCoefficients(Copy(routineSpentWeekCoefficients));
                    // console.log(routinesSeqSorted)
                }
            }.bind(this);
            Array.from({ length: 24 }, (x, i) => i).forEach(func);
            this.cash.Set(JSON.stringify(finalSchedule));
            return finalSchedule;
        });
    }
}
//# sourceMappingURL=schedule.js.map
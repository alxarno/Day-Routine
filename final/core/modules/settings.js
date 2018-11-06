var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CoreModule from "./module";
const openFile = window.require('electron').
    remote.require('./renderer').openFile;
const writeFile = window.require('electron').
    remote.require('./renderer').writeToFile;
const saveFile = window.require('electron').
    remote.require('./renderer').saveFile;
const chooseFile = window.require('electron').
    remote.require('./renderer').chooseFile;
export class SettingsCore extends CoreModule {
    Import() {
        return __awaiter(this, void 0, void 0, function* () {
            let path = yield chooseFile();
            let data = yield openFile(path[0]);
            yield this.ClearAll();
            let newData = JSON.parse(data);
            newData.routines.forEach((element) => {
                this.storage.Routines().Create(element);
            });
            newData.dead_zones.forEach((element) => {
                this.storage.DeadZones().Create(element);
            });
        });
    }
    Delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    Export() {
        return __awaiter(this, void 0, void 0, function* () {
            let routines = this.storage.Routines().Get();
            let dead_zones = this.storage.DeadZones().Get();
            let final = {};
            Promise.all([routines, dead_zones]).then(result => {
                final["routines"] = result[0];
                final["dead_zones"] = result[1];
            });
            let fileName = yield saveFile();
            writeFile(fileName, JSON.stringify(final));
        });
    }
    ClearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let routines = this.storage.Routines().Get();
            let dead_zones = this.storage.DeadZones().Get();
            let delQuerys = [];
            yield Promise.all([routines, dead_zones]).then(result => {
                result[0].forEach((element) => {
                    delQuerys.push(this.storage.Routines().Delete({ ID: element.ID }));
                });
                result[1].forEach((element) => {
                    delQuerys.push(this.storage.DeadZones().Delete({ ID: element.ID }));
                });
            });
            yield Promise.all(delQuerys);
        });
    }
}
//# sourceMappingURL=settings.js.map
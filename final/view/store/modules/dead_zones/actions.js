var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetAPI } from "src/view/external.api";
export const actions = {
    setCurrentItem({ commit }, number) {
        commit('setActiveDeadZone', { number });
    },
    newDeadZone({ commit }) {
        return __awaiter(this, void 0, void 0, function* () {
            commit('setActiveDeadZone', { number: -1 });
            // HERE
            let deadZone = {
                ID: -1,
                name: "Yet another DZ",
                start: 0,
                done: 1,
                enable: false,
                disabled_days: []
            };
            yield GetAPI().DeadZones().Create(deadZone);
            let deadZones = yield GetAPI().DeadZones().Get();
            commit('loadedDeadZones', { deadZones });
        });
    },
    loadDeadZones({ commit }) {
        return __awaiter(this, void 0, void 0, function* () {
            let deadZones = yield GetAPI().DeadZones().Get();
            commit('loadedDeadZones', { deadZones });
        });
    },
    saveChangedDeadZone({ commit }, dead_zone) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(dead_zone)
            yield GetAPI().DeadZones().Update(dead_zone);
            let deadZones = yield GetAPI().DeadZones().Get();
            commit('loadedDeadZones', { deadZones });
        });
    },
    deleteDeadZone({ commit }, dead_zone) {
        return __awaiter(this, void 0, void 0, function* () {
            commit('setActiveDeadZone', { number: -1 });
            yield GetAPI().DeadZones().Delete({ ID: dead_zone.ID });
            let deadZones = yield GetAPI().DeadZones().Get();
            commit('loadedDeadZones', { deadZones });
        });
    }
};
//# sourceMappingURL=actions.js.map
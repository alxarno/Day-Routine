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
    newRoutineWindow({ commit }) {
        commit("app/changePopUp", {}, { root: true });
        commit("drop");
        commit('newRoutineWindow');
    },
    routineSettingsWindow({ commit }) {
        commit("app/changePopUp", {}, { root: true });
        commit("drop");
        commit('routineSettingsWindow');
    },
    currentRoutineChange({ commit }, number) {
        commit('setCurrentRoutine', { number });
    },
    addRoutine({ commit }, routine) {
        return __awaiter(this, void 0, void 0, function* () {
            yield GetAPI().Routines().Create(routine);
            let routines = yield GetAPI().Routines().Get();
            commit('loadedRoutines', { routines });
            commit('setCurrentRoutine', { number: -1 });
            commit('drop');
            commit("app/changePopUp", {}, { root: true });
        });
    },
    deleteRoutine({ commit }, routine) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(routine);
            yield GetAPI().Routines().Delete({ ID: routine.ID });
            let routines = yield GetAPI().Routines().Get();
            commit('loadedRoutines', { routines });
        });
    },
    // closeRoutines({commit}){
    //   commit('setCurrentRoutine', {number:-1})
    //   commit('drop')
    // },
    openRoutineSettings({ commit }, id) {
        commit("drop");
        commit('setCurrentRoutine', { number: id });
        commit("app/changePopUp", {}, { root: true });
        commit('routineSettingsWindow');
    },
    loadRoutines({ commit }) {
        return __awaiter(this, void 0, void 0, function* () {
            commit("loaded");
            let routines = yield GetAPI().Routines().Get();
            commit('loadedRoutines', { routines });
        });
    },
    saveRoutine({ commit }, routine) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            yield GetAPI().Routines().Update(routine);
            commit("loaded");
            let routines = yield GetAPI().Routines().Get();
            commit('loadedRoutines', { routines });
        });
    }
};
//# sourceMappingURL=actions.js.map
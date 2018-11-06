import { GetAPI } from "src/view/external.api";
export const actions = {
    setSettingsMenuItem({ commit }, number) {
        commit('setSettingsMenuActive', { number });
    },
    exportData({ commit }) {
        GetAPI().Settings().Export();
    },
    importData({ commit }) {
        GetAPI().Settings().Import();
    },
    clearAll({ commit }) {
        GetAPI().Settings().ClearAll();
    }
};
//# sourceMappingURL=actions.js.map
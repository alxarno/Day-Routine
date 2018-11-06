export const actions = {
    setMenuItem({ commit }, number) {
        commit('setMenuActivItem', { number });
    },
    settingsOpenChange({ commit }) {
        commit("changePopUp");
        commit('changeSettings');
    },
    closePopUp({ commit }) {
        commit("routines/drop", {}, { root: true });
        commit("closeSettings");
        commit("changePopUp");
    },
    openPopUp({ commit }) {
        commit("changePopUp");
    },
};
//# sourceMappingURL=actions.js.map
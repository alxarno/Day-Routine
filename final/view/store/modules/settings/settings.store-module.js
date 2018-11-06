const SettingsModule = {
    state: {
        menu_active_item: 0,
    },
    actions: {
        setSettingsMenuItem({ commit }, number) {
            // console.log(number)
            commit('SET_SETTINGS_MENU_ACTIVE_ITEM', number);
        },
        exportData({ commit }) {
        },
        importData({ commit }) {
        }
    },
    mutations: {
        SET_SETTINGS_MENU_ACTIVE_ITEM: (state, { number }) => {
            state.menu_active_item = number;
        }
    },
    getters: {},
};
export default SettingsModule;
//# sourceMappingURL=settings.store-module.js.map
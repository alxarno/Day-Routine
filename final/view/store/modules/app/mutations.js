export const mutations = {
    setMenuActivItem: (state, { number }) => {
        // console.log(state, number)
        state.menu_active_item = number;
    },
    changeSettings: (state) => {
        state.settings_open = !state.settings_open;
    },
    closeSettings: (state) => {
        state.settings_open = false;
    },
    changePopUp: (state) => {
        state.popup_open = !state.popup_open;
    },
};
//# sourceMappingURL=mutations.js.map
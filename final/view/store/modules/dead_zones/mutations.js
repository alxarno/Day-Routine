export const mutations = {
    setActiveDeadZone: (state, { number }) => {
        state.currentItem = number;
    },
    createNewDeadZone: (state) => {
    },
    loadedDeadZones: (state, { deadZones }) => {
        state.items = deadZones;
    }
};
//# sourceMappingURL=mutations.js.map
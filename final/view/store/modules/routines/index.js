import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
export const state = {
    current_routine: 1,
    routine_settings_open: false,
    new_routine_open: false,
    loaded: false,
    items: []
};
const namespaced = true;
export const routines = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};
//# sourceMappingURL=index.js.map
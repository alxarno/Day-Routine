import Vue from 'vue';
import Vuex from 'vuex';
// import RoutinesModule from './modules/routines/routines.store-module'
import { app } from './modules/app';
import { deadZones } from './modules/dead_zones';
import { routines } from './modules/routines';
import { schedule } from './modules/schedule';
import { settings } from './modules/settings';
Vue.use(Vuex);
const store = {
    modules: {
        app,
        deadZones,
        routines,
        schedule,
        settings
    }
};
export default new Vuex.Store(store);
//# sourceMappingURL=index.js.map
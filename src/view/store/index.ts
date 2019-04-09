import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import {app} from "./modules/app";
import {deadZones} from "./modules/dead_zones";
import {routines} from "./modules/routines";
import {schedule} from "./modules/schedule";
import {settings} from "./modules/settings";
import { IRootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  modules: {
    app,
    deadZones,
    routines,
    schedule,
    settings,
  },
};

export default new Vuex.Store<IRootState>(store);

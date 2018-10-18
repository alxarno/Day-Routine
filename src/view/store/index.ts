import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
// import RoutinesModule from './modules/routines/routines.store-module'
import {app} from './modules/app'
import {deadZones} from './modules/dead_zones'
import {routines} from './modules/routines'
import {schedule} from './modules/schedule'
import {settings} from './modules/settings'
// import SettingsModule from './modules/settings/settings.store-module'
// import DeadZonesModule from './modules/dead_zones/dead_zones.store-module'
// import ScheduleModule from './modules/schedule/schedule.store-module';
import { RootState } from './types';

Vue.use(Vuex)

const store: StoreOptions<RootState>={
  modules: {
    app,
    deadZones,
    routines,
    schedule,
    settings
  }
}


export default new Vuex.Store<RootState>(store)
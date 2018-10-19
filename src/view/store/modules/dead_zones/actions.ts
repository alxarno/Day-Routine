import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IDeadZoneState } from "./types";
import { GetAPI } from "src/view/external.api";
import { DeadZone } from "src/models/dead_zone";

export const actions:ActionTree<IDeadZoneState, RootState> = {
    setCurrentItem({commit}, number:number) {
      commit('setActiveDeadZone', {number})
    },
    async newDeadZone({commit}) {
      // HERE
      let deadZone:DeadZone={
        ID:-1,
        name: "Yet another DZ",
        start:0,
        done: 1,
        enable:false,
        disabled_days:[]
      }
      await GetAPI().DeadZones().Create(deadZone)
      let deadZones = await GetAPI().DeadZones().Get()
      commit('loadedDeadZones', {deadZones})
    },
    async loadDeadZones({commit}){
      let deadZones = await GetAPI().DeadZones().Get()
      commit('loadedDeadZones', {deadZones})
    }
}
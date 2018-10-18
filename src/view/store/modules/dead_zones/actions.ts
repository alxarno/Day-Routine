import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IDeadZoneState } from "./types";

export const actions:ActionTree<IDeadZoneState, RootState> = {
    setCurrentItem({commit}, number:number) {
      commit('setActiveDeadZone', {number})
    },
    newDeadZone({commit}) {
      // HERE
      commit('createNewDeadZone')
    },
}
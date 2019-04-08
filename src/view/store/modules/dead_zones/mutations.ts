import { IDeadZoneState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<IDeadZoneState> = {
    setActiveDeadZone: (state, value) => {
      state.currentItem = value;
    },
    createNewDeadZone: (state) => {
      //
    },
    loadedDeadZones: (state, deadZones) => {
      state.items = deadZones;
    },
};

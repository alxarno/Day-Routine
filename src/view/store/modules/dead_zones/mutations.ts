import { IDeadZoneState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<IDeadZoneState> = {
    setActiveDeadZone: (state, {number}) => {
      state.currentItem = number;
    },
    createNewDeadZone: (state) => {

    },
    loadedDeadZones: (state, {deadZones}) => {
      state.items = deadZones;
    },
};

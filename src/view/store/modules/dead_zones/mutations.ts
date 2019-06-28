import { IDeadZoneState, IDeadZoneMutations, SetActiveDeadZone, CreateNewDeadZone, LoadedDeadZones } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<IDeadZoneState> & IDeadZoneMutations = {
    [SetActiveDeadZone]: (state, value) => {
      state.currentItem = value;
    },

    [CreateNewDeadZone]: (state) => {
      //
    },

    [LoadedDeadZones]: (state, deadZones) => {
      state.items = deadZones;
    },
};

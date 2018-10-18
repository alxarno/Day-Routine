import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { ISettingsState } from "./types";

export const actions:ActionTree<ISettingsState, RootState> = {
  setSettingsMenuItem({commit}, number) {
    commit('setSettingsMenuActive', {number})
  },
}
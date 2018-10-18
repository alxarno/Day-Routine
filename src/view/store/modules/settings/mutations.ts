import { ISettingsState } from "./types";
import { MutationTree } from "vuex";

export const mutations:MutationTree<ISettingsState>={
  setSettingsMenuActive:(state, {number}) => {
    state.menu_active_item = number
  }
}
import { ISettingsState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ISettingsState> = {
  setSettingsMenuActive: (state, val: number) => {
    state.menu_active_item = val;
  },
  setSettings: (state, data: any) => {
    state.data = data;
  },
};

import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { ISettingsState } from "./types";

import { GetAPI } from "src/view/external.api";

export const actions:ActionTree<ISettingsState, RootState> = {
  setSettingsMenuItem({commit}, number) {
    commit('setSettingsMenuActive', {number})
  },
  exportData({commit}){
    GetAPI().Settings().Export()
  },
  importData({commit}){
    GetAPI().Settings().Import()
  },
  clearAll({commit}){
    GetAPI().Settings().ClearAll()
  }

}
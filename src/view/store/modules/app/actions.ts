import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IAppState } from "./types";

export const actions:ActionTree<IAppState, RootState> = {
  setMenuItem({commit}, number):any {
    commit('setMenuActivItem', {number})
  },
  settingsOpenChange({commit}):any {
    commit('changeSettings')
  },    
  closePopUp({commit}):any{
    commit("DROP")
    commit("closeSettings")
    commit("changePopUp")
  },
  openPopUp({commit}):any{
    commit("changePopUp")
  }
}
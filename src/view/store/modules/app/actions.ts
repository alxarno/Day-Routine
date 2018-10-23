import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IAppState } from "./types";

export const actions:ActionTree<IAppState, RootState> = {
  setMenuItem({commit}, number):any {
    commit('setMenuActivItem', {number})
  },
  settingsOpenChange({commit}):any {
    commit("changePopUp")
    commit('changeSettings')
  },    
  closePopUp({commit}):any{
    commit("routines/drop", {}, { root: true })
    commit("closeSettings")
    commit("changePopUp")
  },
  openPopUp({commit}):any{
    commit("changePopUp")
  }
}
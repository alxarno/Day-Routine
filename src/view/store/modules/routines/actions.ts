import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IRoutinesState } from "./types";
import { Routine } from "src/models/routines.routine";

export const actions:ActionTree<IRoutinesState, RootState> = {
  newRoutineWindow({commit}) {
    commit("changePopUp")
    commit("drop")
    commit('newRoutineWindow')
  },
  routineSettingsWindow({commit}){
    commit("changePopUp")
    commit("drop")
    commit('routineSettingsWindow')
  },
  currentRoutineChange({commit}, number:number){
    commit('setCurrentRoutine', {number})
  },
  addRoutine({commit},routine:Routine){
    // console.log("Save", routine);
  },
  closeRoutines({commit}){
    commit('drop')
  }
}
import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IRoutinesState } from "./types";
import { Routine } from "src/models/routines.routine";
import { GetAPI } from "src/view/external.api";

export const actions:ActionTree<IRoutinesState, RootState> = {
  newRoutineWindow({commit}) {
    commit("app/changePopUp", {}, { root: true })
    commit("drop")
    commit('newRoutineWindow')
  },
  routineSettingsWindow({commit}){
    commit("app/changePopUp",{}, { root: true })
    commit("drop")
    commit('routineSettingsWindow')
  },
  currentRoutineChange({commit}, number:number){
    commit('setCurrentRoutine', {number})
  },
  async addRoutine({commit},routine:Routine){
    await GetAPI().Routines().Create(routine)
    let routines = await GetAPI().Routines().Get()
    commit('loadedRoutines', {routines})

    commit('setCurrentRoutine', {number:-1})
    commit('drop')
    commit("app/changePopUp",{}, { root: true })
  },
  async deleteRoutine({commit}, routine:Routine){
    console.log(routine)
    await GetAPI().Routines().Delete({ID:routine.ID})
    let routines = await GetAPI().Routines().Get()
    commit('loadedRoutines', {routines})
  },
  // closeRoutines({commit}){
  //   commit('setCurrentRoutine', {number:-1})
  //   commit('drop')
  // },
  openRoutineSettings({commit}, id:number){
    commit("drop")
    commit('setCurrentRoutine', {number:id})
    commit("app/changePopUp",{}, { root: true })
    commit('routineSettingsWindow')
   
  },
  async loadRoutines({commit}){
      commit("loaded")
      let routines = await GetAPI().Routines().Get()
      commit('loadedRoutines', {routines})
  },
  async saveRoutine({commit}, routine:Routine){
    await GetAPI().Routines().Update(routine)
    commit("loaded")
    let routines = await GetAPI().Routines().Get()
    commit('loadedRoutines', {routines})
  }
}
import { IRoutinesState } from "./types";
import { MutationTree } from "vuex";

export const mutations:MutationTree<IRoutinesState>={
  newRoutineWindow:(state)=>{
    state.new_routine_open=true
  },
  drop:(state)=>{
    state.routine_settings_open = false
    state.new_routine_open = false
  },
  routineSettingsWindow:(state)=>{
    state.routine_settings_open = true
  },
  setCurrentRoutine:(state,{number})=>{
    state.current_routine = number
  },
  loadedRoutines:(state,{routines})=>{
    state.items = routines.map((v:any)=>v)
    state.loaded = true
  },
  loaded:(state)=>{
    state.loaded = false
  }
}
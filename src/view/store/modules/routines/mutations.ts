import Vue from "vue";

import {
  IRoutinesState,
  IRoutinesMutations,
  Drop,
  RoutineSettingsWindow,
  SetCurrentGraphPanel,
  LoadedRoutines,
  SetRoutine,
  NewRoutineWindow,
} from "./types";
import { MutationTree } from "vuex";
import { IRoutine } from "src/models/routines.routine";

export const mutations: MutationTree<IRoutinesState> & IRoutinesMutations = {
  [NewRoutineWindow]: (state: IRoutinesState) => {
    state.new_routine_open = true;
  },

  [Drop]: (state: IRoutinesState) => {
    state.routine_settings_open = false;
    state.new_routine_open = false;
  },

  [RoutineSettingsWindow]: (state: IRoutinesState) => {
    state.routine_settings_open = true;
  },

  [SetCurrentGraphPanel]:  (state: IRoutinesState, val: number) => {
    state.current_routine = val;
  },

  [LoadedRoutines]: (state: IRoutinesState, routines: IRoutine[]) => {
    state.items = routines;
    state.loaded = true;
  },

  [SetRoutine]: (state, data: {index: number, routine: IRoutine}) => {
    Vue.set(state.items, data.index, data.routine);
    state.loaded = true;
  },

  // newRoutineWindow: (state) => {
  //   state.new_routine_open = true;
  // },
  // drop: (state) => {
  //   state.routine_settings_open = false;
  //   state.new_routine_open = false;
  // },
  // routineSettingsWindow: (state) => {
  //   state.routine_settings_open = true;
  // },
  // setCurrentRoutine: (state, val) => {
  //   state.current_routine = val;
  // },
  // loadedRoutines: (state, routines) => {
  //   state.items = routines;
  //   state.loaded = true;
  // },
  // loading: (state) => {
  //   // state.loaded = false;
  // },
  // setCurrentGraphPanel: (state, val) => {
  //   state.routineGraph = val;
  // },
  // setRoutine: (state, data: {index: number, routine: IRoutine}) => {
  //   state.items[data.index] = data.routine;
  //   state.loaded = false;
  //   state.loaded = true;
  // },
};

import { IRoutinesState } from "./types";
import { MutationTree } from "vuex";
import { IRoutine } from "src/models/routines.routine";
import { routines } from ".";

export const mutations: MutationTree<IRoutinesState> = {
  newRoutineWindow: (state) => {
    state.new_routine_open = true;
  },
  drop: (state) => {
    state.routine_settings_open = false;
    state.new_routine_open = false;
  },
  routineSettingsWindow: (state) => {
    state.routine_settings_open = true;
  },
  setCurrentRoutine: (state, val) => {
    state.current_routine = val;
  },
  loadedRoutines: (state, routines) => {
    state.items = routines.map((v: any) => v);
    state.loaded = true;
  },
  loaded: (state) => {
    state.loaded = false;
  },
  setCurrentGraphPanel: (state, val) => {
    state.routineGraph = val;
  },
  setRoutine: (state, data: {index: number, routine: IRoutine}) => {
    state.items[data.index] = data.routine;
  },
};

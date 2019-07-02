import { Module } from "vuex";

import {
  IRoutinesState,
  NEW_ROUTINE_WINDOW,
  ROUTINE_SETTINGS_WINDOW,
  CURRENT_ROUTINE_CHANGE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  LOAD_ROUTINES,
  SAVE_ROUTINES,
  CHANGE_STATISTICS,
  SET_ROUTINE_GRAPH,
  UPDATE_CURRENT_ROUTINE,
} from "./types";

import {actions} from "./actions";
import {getters} from "./getters";
import {mutations} from "./mutations";
import { IRootState } from "../../types";

export const state: IRoutinesState = {
  current_routine: -1,
  routine_settings_open: false,
  new_routine_open: false,
  routineGraph: -1,
  loaded: false,
  items: [],
};

const namespaced: boolean = true;

export const routinesJoin = (action: string) => `routines/${action}`;

export {
  NEW_ROUTINE_WINDOW,
  ROUTINE_SETTINGS_WINDOW,
  CURRENT_ROUTINE_CHANGE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  LOAD_ROUTINES,
  SAVE_ROUTINES,
  CHANGE_STATISTICS,
  SET_ROUTINE_GRAPH,
  UPDATE_CURRENT_ROUTINE,
};

export const routines: Module<IRoutinesState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

import { Module } from "vuex";
import { IScheduleState } from "./types";
import { IRootState } from "../../types";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const state: IScheduleState = {
  items: [],
};

const namespaced: boolean = true;

export const schedule: Module<IScheduleState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

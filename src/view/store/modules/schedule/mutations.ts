import { IScheduleState } from "./types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<IScheduleState> = {
  loadedSchedule: (state, {schedule}) => {
    state.items = schedule;
  },
  clearSchedule: (state) => {
    state.items = [];
  },
};

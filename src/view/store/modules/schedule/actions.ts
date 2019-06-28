import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IScheduleState } from "./types";
import { GetAPI } from "src/view/external.api";
import { appJoin, SET_FREE_HOURS } from "../app";

export const actions: ActionTree<IScheduleState, IRootState> = {
  async loadSchedule({commit, dispatch}) {
    commit("clearSchedule");
    const schedule = await GetAPI().Schedule().Get();
    commit("loadedSchedule", {schedule});
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  async recreateSchedule({commit, dispatch}) {
    GetAPI().Schedule().Clear();
    dispatch("loadSchedule", {});
  },
};

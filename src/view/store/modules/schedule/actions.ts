import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IScheduleState } from "./types";
import { GetAPI } from "src/view/external.api";

export const actions: ActionTree<IScheduleState, IRootState> = {
  async loadSchedule({commit, dispatch}) {
    commit("clearSchedule");
    const schedule = await GetAPI().Schedule().Get();
    commit("loadedSchedule", {schedule});
    dispatch("app/setFreeHours", {}, {root: true});
  },

  async recreateSchedule({commit, dispatch}) {
    GetAPI().Schedule().Clear();
    dispatch("loadSchedule", {});
  },
};

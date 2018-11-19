import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IScheduleState } from "./types";
import { GetAPI } from "src/view/external.api";

export const actions: ActionTree<IScheduleState, RootState> = {
  async loadSchedule({commit, dispatch}) {
    commit("clearSchedule");
    const schedule = await GetAPI().Schedule().Get();
    commit("loadedSchedule", {schedule});
    dispatch("app/setFreeHours", {}, {root: true});
  },
};

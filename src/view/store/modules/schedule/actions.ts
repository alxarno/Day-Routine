import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IScheduleState } from "./types";
import { GetAPI } from 'src/view/external.api';

export const actions:ActionTree<IScheduleState, RootState> = {
  async loadSchedule({commit}){
    commit("clearSchedule")
    let schedule = await GetAPI().Schedule().Get()
    commit('loadedSchedule', {schedule})
  },
}
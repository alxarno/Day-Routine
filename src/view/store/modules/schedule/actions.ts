import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IScheduleState } from "./types";
import { GetAPI } from 'src/view/external.api';

export const actions:ActionTree<IScheduleState, RootState> = {
  async loadSchedule({commit}){
    try{
      let schedule = await GetAPI().Schedule().Get()
      commit('laodedSchedule', {schedule})
    }catch(ex){
      console.log(ex)
      throw "Schedule store module error"
    }
  },
}
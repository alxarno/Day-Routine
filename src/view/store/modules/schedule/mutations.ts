import { IScheduleState } from "./types";
import { MutationTree } from "vuex";

export const mutations:MutationTree<IScheduleState>={
  laodedSchedule:(state,{schedule})=>{
    state.items = schedule 
  }
}
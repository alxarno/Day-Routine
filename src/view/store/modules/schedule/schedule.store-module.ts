import { GetAPI } from 'src/view/external.api';
import { Module } from 'vuex';
import { NowTask } from 'src/models/now.tasks';

interface IScheduleModule{
  items:Array<NowTask|null>
}

const ScheduleModule:Module<any,IScheduleModule> = {
  state: {
    items:[]
   },
  actions:{
    async LoadSchedule({commit}){
      try{
        let schedule = await GetAPI().Schedule().Get()
        // console.log(schedule)
        commit('LOAD_SCHEDULE', {schedule})
      }catch(ex){
        console.log("Schedule store module error ", ex)
      }
    },
  
  },
  mutations: {
    LOAD_SCHEDULE:(state,{schedule})=>{
      state.items = schedule 
    }
  },

  getters: {
   
  }
}

export default ScheduleModule
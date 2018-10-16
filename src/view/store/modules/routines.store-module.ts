import {Routine} from 'src/models/routines.routine'

const RoutinesModule = {
  state: {
    current_routine: -1,
    routine_settings_open: false,
    new_routine_open: true,
    routines:[
      {
        
      }
    ]
   },
  actions:{
    newRoutineWindow({commit}) {
      commit("DROP")
      commit('NEW_ROUTINE_WINDOW')
    },
    routineSettingsWindow({commit}){
      commit("DROP")
      commit('ROUTINE_SETTINGS_WINDOW')
    },
    currentRoutineChange({commit}, number:number){
      commit('SET_CURRENT_ROUTINE', number)
    },
    addRoutine({commit},routine:Routine){
      // console.log("Save", routine);
    },
    closeRoutines({commit}){
      commit('DROP')
    }
  },
  mutations: {
    NEW_ROUTINE_WINDOW:(state)=>{
      state.new_routine_open=true
    },
    DROP:(state)=>{
      state.routine_settings_open = false
      state.new_routine_open = false
    },
    ROUTINE_SETTINGS_WINDOW:(state)=>{
      state.routine_settings_open = true
    },
    SET_CURRENT_ROUTINE:(state,{number})=>{
      state.current_routine = number
    },
  },

  getters: {
   
  }
}

export default RoutinesModule
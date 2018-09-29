import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu_active_item: 1,
    settings_open: false,
    current_routine: -1,
    routine_settings_open: false,
    new_routine_open: true
  },

  actions: {
    setMenuItem({commit}, number) {
      commit('SET_MENU_ACTIVE_ITEM', number)
    },
    settingsOpenChange({commit}) {
      commit('CHANGE_SETTINGS_OPEN')
    },
    newRoutineWindow({commit}) {
      commit('NEW_ROUTINE_WINDOW')
    },
    routineSettingsWindow({commit}){
      commit('ROUTINE_SETTINGS_WINDOW')
    },
    currentRoutineChange({commit}, number){
      commit('SET_CURRENT_ROUTINE', number)
    },
    closePopUps({commit}){
      commit("CLOSE_POPUPS")
    }


  },
  mutations: {
    SET_MENU_ACTIVE_ITEM:(state, {number}) => {
      state.menu_active_item = number
    },
    CHANGE_SETTINGS_OPEN:(state)=>{
      state.settings_open = !state.settings_open
    },
    NEW_ROUTINE_WINDOW:(state)=>{
      state.new_routine_open=!state.new_routine_open
    },
    ROUTINE_SETTINGS_WINDOW:(state)=>{
      state.routine_settings_open = !state.routine_settings_open
    },
    SET_CURRENT_ROUTINE:(state,{number})=>{
      state.current_routine = number
    },
    CLOSE_POPUPS:(state)=>{
      state.routine_settings_open = false
      state.new_routine_open = false
    }
  },
  getters: {
    getMenuActiveItem: state=>{
      return state.menu_active_item
    },
    getSettingsOpened: state=>{
      return state.settings_open  
    },
    routineSettingsOpen:state=>{
      return state.routine_settings_open
    },
    newRoutineOpen:state=>{
      return state.new_routine_open
    }
  }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu_active_item: 0,
    settings_open: false
  },
  actions: {
    setMenuItem({commit}, number) {
      commit('SET_MENU_ACTIVE_ITEM', number)
    },
    settingsOpenChange({commit}) {
      commit('CHANGE_SETTINGS_OPEN')
    }

  },
  mutations: {
    SET_MENU_ACTIVE_ITEM:(state, {number}) => {
      state.menu_active_item = number
    },
    CHANGE_SETTINGS_OPEN:(state)=>{
      state.settings_open = !state.settings_open
    }
  },
  getters: {
    getMenuActiveItem: state=>{
      return state.menu_active_item
    },
    getSettingsOpened: state=>{
      return state.settings_open  
    }
  }
})
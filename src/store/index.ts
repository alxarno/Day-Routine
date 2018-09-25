import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menu_active_item: 0
  },
  actions: {
    // CHANGE_MENU_ACTIVE_ITEM: ({commit: any})=>{

    // }
  },
  mutations: {
    SET_MENU_ACTIVE_ITEM:(state, {number}) => {
      state.menu_active_item = number
    }
  },
  getters: {
    menuActiveItem: state=>{
      return state.menu_active_item
    }
  }
})
export default store
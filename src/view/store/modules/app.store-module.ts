import Vuex from 'vuex'

const AppModule = {
  state: {
    menu_active_item: 0,
    // settings_open: false,
    popup_open: false
   },
  actions:{
    setMenuItem({commit}, number) {
      commit('SET_MENU_ACTIVE_ITEM', number)
    },
    settingsOpenChange({commit}) {
      commit('CHANGE_SETTINGS_OPEN')
    },    
    closePopUp({commit}){
      commit("POP_UP")
    },
    openPopUp({commit}){
      commit("POP_UP")
    }

  },
  mutations: {
    SET_MENU_ACTIVE_ITEM:(state, {number}) => {
      state.menu_active_item = number
    },
    CHANGE_SETTINGS_OPEN:(state)=>{
      // state.settings_open = !state.settings_open
    },
    POP_UP:(state)=>{
      state.popup_open = !state.popup_open
    }
   
  },

  getters: {
   
  }
}

export default AppModule
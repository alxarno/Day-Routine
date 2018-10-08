const AppModule = {
  state: {
    menu_active_item: 0,

   },
  actions:{
    setSettingsMenuItem({commit}, number) {
      console.log(number)
      commit('SET_SETTINGS_MENU_ACTIVE_ITEM', number)
    },
  

  },
  mutations: {
    SET_SETTINGS_MENU_ACTIVE_ITEM:(state, {number}) => {
      state.menu_active_item = number
    }
  },

  getters: {
    activeItem(){
      return state.menu_active_item
    }
  },

  
}

export default AppModule
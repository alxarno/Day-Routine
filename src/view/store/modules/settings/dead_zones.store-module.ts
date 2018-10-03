import {DeadZone} from 'src/models/dead_zone'

const deadZones:Array<DeadZone> = [
  {
    start: 0,
    done: 10,
    enable: true,
    name: "Sleep"
  },
  {
    start: 13,
    done: 14,
    enable: false,
    name: "Deener"
  }
]

const DeadZonesModule = {
  state: {
    currentItem: 0,
    items: deadZones,
    
   },
  actions:{
    setSettingsMenuItem({commit}, number) {
      commit('SET_ACTIVE_ITEM', number)
    },
  

  },
  mutations: {
    SET_ACTIVE_ITEM:(state, {number}) => {
      state.currentItem = number
    }
  },

  getters: {
    // currentItem(){
    //   return state.currentItem
    // }
  }
}

export default DeadZonesModule
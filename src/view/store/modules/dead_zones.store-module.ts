import {DeadZone} from 'src/models/dead_zone'

const deadZones:Array<DeadZone> = [
  {
    start: 0,
    done: 10,
    enable: true,
    name: "Sleep",
    disabled_days: [0,3]
  },
  {
    start: 13,
    done: 14,
    enable: false,
    name: "Deener",
    disabled_days: []
  }
]

const DeadZonesModule = {
  state: {
    currentItem: -1,
    items: deadZones,
    
   },
  actions:{
    SetCurrentItem({commit}, number:number) {
      commit('SET_ACTIVE_ITEM', number)
    },
    NewDeadZone({commit}) {
      // HERE
      commit('CREATE_NEW_DEAD_ZONE', number)
    },
  

  },
  mutations: {
    SET_ACTIVE_ITEM:(state, {number}) => {
      state.currentItem = number
    },
    CREATE_NEW_DEAD_ZONE:(state, {number})=>{

    }
  },

 
}

export default DeadZonesModule
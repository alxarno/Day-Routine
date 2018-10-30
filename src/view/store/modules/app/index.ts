import { Module } from "vuex";
import { IAppState } from "./types";
import { RootState } from "../../types";

import {actions} from './actions'
import {mutations} from './mutations'
import {getters} from './getters'


export const state:IAppState = {
    menu_active_item: 2,
    settings_open: false,
    popup_open: false,
}

const namespaced:boolean = true

export const app: Module<IAppState, RootState>={
  namespaced,
  state,
  getters,
  actions,
  mutations
}
// interface IAppModule{
  //   menu_active_item:number,
  //   settings_open:boolean,
  //   popup_open:boolean
  // }

  // const AppModule:Module<any, IAppModule> = {
  //   state: {
  //     menu_active_item: 0,
  //     settings_open: false,
  //     popup_open: false
  //    },
  //   actions:{
  //     setMenuItem({commit}, number) {
  //       commit('SET_MENU_ACTIVE_ITEM', number)
  //     },
  //     settingsOpenChange({commit}) {
  //       commit('CHANGE_SETTINGS')
  //     },    
  //     closePopUp({commit}){
  //       commit("DROP")
  //       commit("CLOSE_SETTINGS")
  //       commit("POP_UP")
  //     },
  //     openPopUp({commit}){
  //       commit("POP_UP")
  //     }

  //   },
  //   mutations: {
  //     SET_MENU_ACTIVE_ITEM:(state, {number}) => {
  //       state.menu_active_item = number
  //     },
  //     CHANGE_SETTINGS:(state)=>{
  //       state.settings_open = !state.settings_open
  //     },
  //     CLOSE_SETTINGS:(state)=>{
  //       state.settings_open = false
  //     },
  //     POP_UP:(state)=>{
  //       state.popup_open = !state.popup_open
  //     }
    
  //   },

  //   getters: {
    
  //   }
  // }

  // export default AppModule
import { Module } from "vuex";
import { IRootState } from "../../types";
import {DrawerContent} from "../../api";

import {
  IAppState,
  SET_MENU_ITEM,
  DRAWER_ACTION,
  MODAL_ACTION,
  SHOW_MODAL,
  CLOSE_MODAL,
  SET_FREE_HOURS,
  SHOW_SNACK_BAR,
  CLOSE_SNACK_BAR,
  SNACK_BAR_ACTION,
} from "./types";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const state: IAppState = {
    menuActiveItem: 0,
    drawer: false,
    drawerContent: DrawerContent.Nothing,
    modal: false,
    modalEntity: null,
    freeHours: 0,
    snackbars: [],
};

const namespaced: boolean = true;

export const appJoin = (action: string) => `app/${action}`;

export {
  SET_MENU_ITEM,
  DRAWER_ACTION,
  MODAL_ACTION,
  SHOW_MODAL,
  CLOSE_MODAL,
  SET_FREE_HOURS,
  SHOW_SNACK_BAR,
  CLOSE_SNACK_BAR,
  SNACK_BAR_ACTION,
};

export const app: Module<IAppState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

import { Module } from "vuex";
import { IAppState } from "./types";
import { RootState } from "../../types";
import {DrawerContent, ModalContent} from "../../api";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const state: IAppState = {
    menuActiveItem: 1,
    drawer: false,
    drawerContent: DrawerContent.Settings,
    modal: false,
    modalContent: ModalContent.Some,
    freeHours: 0,
};

const namespaced: boolean = true;

export const app: Module<IAppState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

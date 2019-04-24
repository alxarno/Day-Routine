import { Module } from "vuex";
import { IAppState } from "./types";
import { IRootState } from "../../types";
import {DrawerContent, ModalContent} from "../../api";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const state: IAppState = {
    menuActiveItem: 0,
    drawer: false,
    drawerContent: DrawerContent.Nothing,
    modal: false,
    modalContent: ModalContent.Some,
    freeHours: 0,
};

const namespaced: boolean = true;

export const app: Module<IAppState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

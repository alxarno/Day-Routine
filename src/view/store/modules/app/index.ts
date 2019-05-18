import { Module } from "vuex";
import { IAppState } from "./types";
import { IRootState } from "../../types";
import {DrawerContent, ModalContent} from "../../api";
import {IModal, ModalType} from "src/models/modals";

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

export const app: Module<IAppState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

import { IAppState } from "./types";
import { MutationTree } from "vuex";
import {DrawerContent, ModalContent} from "../../api";

export const mutations: MutationTree<IAppState> = {
  setMenuActivItem: (state, item) => {
    // console.log(state, number)
    state.menuActiveItem = item;
  },
  drawerOpen: (state, content: DrawerContent) => {
    state.drawerContent = content;
    state.drawer = true;
  },
  drawerClose: (state) => {
    state.drawer = false;
  },
  modalOpen: (state, content: ModalContent) => {
     state.modalContent = content;
     state.drawer = true;
  },
  modalClose: (state) => {
    state.drawer = false;
  },
};

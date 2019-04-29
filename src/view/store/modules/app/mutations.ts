import { IAppState} from "./types";
import { MutationTree } from "vuex";
import {DrawerContent, ModalContent} from "../../api";
import { stat } from "fs";
import { ISnackBar } from "src/models/snackbar";

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
    state.drawerContent = DrawerContent.Nothing;
  },
  modalOpen: (state, content: ModalContent) => {
     state.modalContent = content;
     state.drawer = true;
  },
  modalClose: (state) => {
    state.drawer = false;
    state.modalContent = ModalContent.Some;
  },
  setFreeHours: (state, hours: number) => {
    state.freeHours = hours;
  },
  addSnackBar: (state, data: ISnackBar) => {
    state.snackbars.push(data);
  },
  deleteSnackBar: (state, ID: number) => {
    console.log(ID + " done");
    state.snackbars = state.snackbars.filter((v) => v.ID !== ID);
  },
  hideSnackBar: (state, ID: number) => {
    console.log(ID + " hide");
    state.snackbars.forEach((v) => {
      if (v.ID === ID) {
        v.Hided = true;
      }
    });
  },

};

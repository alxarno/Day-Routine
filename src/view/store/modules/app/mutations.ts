import { IAppState} from "./types";
import { MutationTree } from "vuex";
import {DrawerContent, ModalContent} from "../../api";
import { ISnackBar, SnackBarType, ISnackBarNewConnection } from "src/models/snackbar";
import { IModal } from "src/models/modals";

export const mutations: MutationTree<IAppState> = {
  setMenuActivItem: (state, item) => {
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
  modalOpen: (state, modal: IModal) => {
     state.modalEntity = modal;
     state.modal = true;
  },
  modalClose: (state, data: any) => {
    state.modalEntity!.Content.Callback(data);
    state.modal = false;
    state.modalEntity = null;
  },
  setFreeHours: (state, hours: number) => {
    state.freeHours = hours;
  },
  addSnackBar: (state, data: ISnackBar) => {
    state.snackbars.push(data);
  },
  deleteSnackBar: (state, ID: number) => {
    state.snackbars = state.snackbars.filter((v) => v.ID !== ID);
  },
  hideSnackBar: (state, ID: number) => {
    state.snackbars.forEach((v) => {
      if (v.ID === ID) {
        v.Hided = true;
      }
    });
  },
  updateTimeoutSnackBar: (state: IAppState, data: {ID: number, newTimer: NodeJS.Timeout}) => {
    state.snackbars.forEach((v: ISnackBar) => {
      if (v.ID === data.ID) {
        v.TimeOut.Timer = data.newTimer;
      }
    });
  },
  executeSnackBar: (state, data: {ID: number, answer: boolean}) => {
    let done = false;
    state.snackbars.forEach((v: ISnackBar) => {
      if (done) {return; }
      if (v.ID === data.ID && (v.Type === SnackBarType.NewConnection ||  v.Type === SnackBarType.EnterPassword)) {
        if (!v.Executed) {
          (v.Content as ISnackBarNewConnection).Callback(data.answer);
          v.Executed = true;
        }
        done = true;
      }
    });
  },

};

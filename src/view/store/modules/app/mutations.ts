import {
  IAppState,
  IAppMutations,
  SetMenuActiveItem,
  DrawerOpen,
  DrawerClose,
  ModalOpen,
  ModalClose,
  SetFreeHours,
  AddSnackBar,
  DeleteSnackBar,
  HideSnackBar,
  UpdateTimeoutSnackBar,
  ExecuteSnackBar,
} from "./types";
import { MutationTree } from "vuex";
import {DrawerContent} from "../../api";
import { ISnackBar, SnackBarType, ISnackBarNewConnection } from "src/models/snackbar";
import { IModal } from "src/models/modals";

export const mutations: MutationTree<IAppState> & IAppMutations = {
  [SetMenuActiveItem]: (state: IAppState, item) => {
    state.menuActiveItem = item;
  },
  [DrawerOpen]: (state: IAppState, content: DrawerContent) => {
    state.drawerContent = content;
    state.drawer = true;
  },
  [DrawerClose]: (state: IAppState) => {
    state.drawer = false;
    state.drawerContent = DrawerContent.Nothing;
  },
  [ModalOpen]: (state: IAppState, modal: IModal) => {
     state.modalEntity = modal;
     state.modal = true;
  },
  [ModalClose]: (state: IAppState, data: any) => {
    // (state.modalEntity ? state.modalEntity.Content.Callback(data) : null);
    state.modal = false;
    state.modalEntity = null;
  },
  [SetFreeHours]: (state: IAppState, hours: number) => {
    state.freeHours = hours;
  },
  [AddSnackBar]: (state: IAppState, data: ISnackBar) => {
    state.snackbars.push(data);
  },
  [DeleteSnackBar]: (state: IAppState, ID: number) => {
    state.snackbars = state.snackbars.filter((v) => v.ID !== ID);
  },
  [HideSnackBar]: (state: IAppState, ID: number) => {
    state.snackbars.forEach((v) => {
      if (v.ID === ID) {
        v.Hided = true;
      }
    });
  },
  [UpdateTimeoutSnackBar]: (state: IAppState, data: {ID: number, newTimer: NodeJS.Timeout}) => {
    state.snackbars.forEach((v: ISnackBar) => {
      if (v.ID === data.ID) {
        v.TimeOut.Timer = data.newTimer;
      }
    });
  },
  [ExecuteSnackBar]: (state: IAppState, data: {ID: number, answer: boolean}) => {
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

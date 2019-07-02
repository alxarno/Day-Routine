import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import {DrawerContent} from "../../api";
import { GetAPI } from "src/view/external.api";
import { ISnackBarContent, SnackBarType, ISnackBarTimeOut } from "src/models/snackbar";
import { IModal, ModalType } from "src/models/modals";
import {
  IAppState,
  IAppActions,
  HideSnackBar,
  ExecuteSnackBar,
  DeleteSnackBar,
  SetMenuActiveItem,
  DrawerClose,
  DrawerOpen,
  ModalClose,
  ModalOpen,
  SetFreeHours,
  AddSnackBar,
  UpdateTimeoutSnackBar,
//
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
import { routinesJoin, SET_ROUTINE_GRAPH } from "../routines";

const INFO_SNACKBAR_TIME = 7000;
const ERROR_SNACKBAR_TIME = 7000;
const CHOOSE_SNACKBAR_TIME = 150000;
let ID = 0;

function GetSnackBarTime(snackBarType: SnackBarType): number {
  switch (snackBarType) {
    case SnackBarType.Error:
      return ERROR_SNACKBAR_TIME;
    case SnackBarType.Notifier:
      return INFO_SNACKBAR_TIME;
    case SnackBarType.NewConnection:
    case SnackBarType.EnterPassword:
      return CHOOSE_SNACKBAR_TIME;
    default:
      return 0;
  }
}

function GetSnackBarTypeByModal(modaltype: ModalType): SnackBarType {
  switch (modaltype) {
    case ModalType.SyncPass:
      return SnackBarType.EnterPassword;
    default:
      return SnackBarType.Error;
  }
}

function Timer(ID: number, duration: number, commit: (h: string, data: any) => void): ISnackBarTimeOut {
  return{
    Duration: duration,
    Started:  new Date().getTime(), // getTime is number
    Timer: setTimeout((id) => {
      commit(HideSnackBar, id); // First off just show off snack bar because we have animation
      new Promise((res, rej) => setTimeout(res, 1000)).then(() => {
        commit(ExecuteSnackBar, {ID: id, answer: false});
        commit(DeleteSnackBar, id); // Delete from list
      });
    }, duration, Number(ID)),
  };
}

export const actions: ActionTree<IAppState, IRootState> & IAppActions =  {
  [SET_MENU_ITEM]: ({commit, dispatch}, val): any => {
    commit(SetMenuActiveItem,  val);
    dispatch(routinesJoin(SET_ROUTINE_GRAPH), -1, {root: true});
  },

  [DRAWER_ACTION]: ({commit}, val: DrawerContent | -1): void => {
    (val === -1 ?  commit(DrawerClose) :  commit(DrawerOpen, val));
  },

  [MODAL_ACTION]: ({commit}, val: IModal | -1): void => {
    (val === -1 ?  commit(ModalClose) :  commit(ModalOpen, val));
  },

  [SHOW_MODAL]: ({commit, dispatch}, modal: IModal): void  => {
    const call = (res: (accept: boolean) => void) => {
      dispatch(SHOW_SNACK_BAR, {
        snackBarType: GetSnackBarTypeByModal(modal.Type),
        content: {
          SyncID: modal.Content.SyncID,
          Callback: (v: any) => {res(v); },
        },
      });
    };

    new Promise((res, rej) => call(res)).then((v) => {
       (v ? dispatch(MODAL_ACTION, modal) : modal.Content.Callback(""));
    });
  },

  [CLOSE_MODAL]: ({commit}, data: any): void => {
    commit(ModalClose, data);
  },

  [SET_FREE_HOURS]: async ({commit}) => {
    const freeHours = await GetAPI().FreeTime();
    commit(SetFreeHours, freeHours);
  },

  [SHOW_SNACK_BAR]: ({commit}, data: {snackBarType: SnackBarType, content: ISnackBarContent}) => {
    commit(AddSnackBar, {
      ID: ++ID,
      Hided: false,
      Type: data.snackBarType,
      Content: data.content,
      Executed: false,
      TimeOut: Timer(ID, GetSnackBarTime(data.snackBarType), commit),
    });
  },

  [CLOSE_SNACK_BAR]: ({commit}, ID: number) => {
    commit(UpdateTimeoutSnackBar, {
      ID,
      newTimer: Timer(ID, 0, commit),
    });
  },

  [SNACK_BAR_ACTION]: (helpers: {commit: any, dispatch: any}, data: {answer: boolean, ID: number}) => {
    helpers.commit(ExecuteSnackBar, data);
    helpers.dispatch(CLOSE_SNACK_BAR, data.ID);
  },
};

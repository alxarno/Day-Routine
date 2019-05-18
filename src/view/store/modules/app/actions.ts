import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IAppState } from "./types";
import {DrawerContent, ModalContent} from "../../api";
import { GetAPI } from "src/view/external.api";
import { ISnackBarContent, SnackBarType, ISnackBarTimeOut } from "src/models/snackbar";
import SnackBar from "src/view/components/snackbars/unit";
import { IModal, ModalType } from "src/models/modals";

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
      commit("hideSnackBar", id); // First off just show off snack bar because we have animation
      new Promise((res, rej) => setTimeout(res, 1000)).then(() => {
        commit("executeSnackBar", {ID: id, answer: false});
        commit("deleteSnackBar", id); // Delete from list
      });
    }, duration, Number(ID)),
  };
}

export const actions: ActionTree<IAppState, IRootState> = {
  setMenuItem({commit, dispatch}, val): any {
    commit("setMenuActivItem",  val);
    dispatch("routines/setRoutineGraph", -1 , {root: true});
  },
  drawerAction({commit}, val: DrawerContent | -1): void {
    if (val === -1) {
      commit("drawerClose");
    } else {
      commit("drawerOpen", val);
    }
  },
  modalAction({commit}, val: IModal | -1): void {
    if (val === -1) {
      commit("modalClose");
    } else {
      commit("modalOpen", val);
    }
  },
  showModal({commit, dispatch}, modal: IModal): void {
    const call = (res: (accept: boolean) => void) => {
      dispatch("showSnackBar", {
        snackBarType: GetSnackBarTypeByModal(modal.Type),
        content: {
          SyncID: modal.Content.SyncID,
          Callback: (v: any) => {res(v); },
        },
      });
    };

    new Promise((res, rej) => {
      call(res);
    }).then((v) => {
      if (v) {
        dispatch("modalAction", modal);
      } else {
        modal.Content.Callback("");
      }
    });
  },

  closeModal({commit}, data: any): void {
    commit("modalClose", data);
  },
  async setFreeHours({commit}) {
    const freeHours = await GetAPI().FreeTime();
    commit("setFreeHours", freeHours);
  },
  showSnackBar({commit}, data: {snackBarType: SnackBarType, content: ISnackBarContent}) {
    console.log(data);
    commit("addSnackBar", {
      ID: ++ID,
      Hided: false,
      Type: data.snackBarType,
      Content: data.content,
      Executed: false,
      TimeOut: Timer(ID, GetSnackBarTime(data.snackBarType), commit),
    });
  },
  closeSnackBar({commit}, ID: number) {
    commit("updateTimeoutSnackBar", {
      ID,
      newTimer: Timer(ID, 0, commit),
    });
  },
  snackBarAction({commit, dispatch}, data: {answer: boolean, ID: number}) {
    commit("executeSnackBar", data);
    dispatch("closeSnackBar", data.ID);
  },

};

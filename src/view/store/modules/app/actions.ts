import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IAppState } from "./types";
import {DrawerContent, ModalContent} from "../../api";
import { GetAPI } from "src/view/external.api";
import { ISnackBarContent, SnackBarType, ISnackBarTimeOut } from "src/models/snackbar";
import SnackBar from "src/view/components/snackbars/unit";

const INFO_SNACKBAR_TIME = 7000;
const ERROR_SNACKBAR_TIME = 7000;
const CHOOSE_SNACKBAR_TIME = 15000;
let ID = 0;

function GetSnackBarTime(snackBarType: SnackBarType): number {
  switch (snackBarType) {
    case SnackBarType.Error:
      return ERROR_SNACKBAR_TIME;
    case SnackBarType.Notifier:
      return INFO_SNACKBAR_TIME;
    case SnackBarType.NewConnection:
      return CHOOSE_SNACKBAR_TIME;
  }
}

function Timer(ID: number, duration: number, commit: (h: string, data: any) => void): ISnackBarTimeOut {
  return{
    Duration: duration,
    Started:  new Date().getTime(), // getTime is number
    Timer: setTimeout((id) => {
      commit("hideSnackBar", id); // First off just show off snack bar because we have animation
      new Promise((rej, res) => setTimeout(rej, 1000)).then(() => {
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
  modalAction({commit}, val: ModalContent | -1): void {
    if (val === -1) {
      commit("modalClose");
    } else {
      commit("modalOpen", val);
    }
  },
  async setFreeHours({commit}) {
    const freeHours = await GetAPI().FreeTime();
    commit("setFreeHours", freeHours);
  },
  showSnackBar({commit}, data: {snackBarType: SnackBarType, content: ISnackBarContent}) {

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

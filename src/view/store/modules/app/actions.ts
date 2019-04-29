import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IAppState } from "./types";
import {DrawerContent, ModalContent} from "../../api";
import { GetAPI } from "src/view/external.api";
import { ISnackBarContent, SnackBarType } from "src/models/snackbar";

const SNACKBAR_TIME = 13000;
let ID = 0;

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
      TimeOut: setTimeout((id) => {
        commit("hideSnackBar", id); // First off just show off snack bar because we have animation
        new Promise((rej, res) => setTimeout(rej, 1000)).then(() => {
          commit("deleteSnackBar", id); // Delete from list
        });
      }, SNACKBAR_TIME, Number(ID)),
    });
  },
};

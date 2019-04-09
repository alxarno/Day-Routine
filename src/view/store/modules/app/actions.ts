import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IAppState } from "./types";
import {DrawerContent, ModalContent} from "../../api";
import { GetAPI } from "src/view/external.api";

export const actions: ActionTree<IAppState, IRootState> = {
  setMenuItem({commit}, val): any {
    commit("setMenuActivItem",  val);
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
};

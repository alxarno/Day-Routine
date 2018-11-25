import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { ISettingsState } from "./types";

import { GetAPI } from "src/view/external.api";
import { ISettings } from "src/interfaces/settingsStore";

export const actions: ActionTree<ISettingsState, RootState> = {
  setSettingsMenuItem({commit}, val: number) {
    commit("setSettingsMenuActive", val);
  },
  exportData({commit}) {
    GetAPI().Settings().Export();
  },
  importData({commit}) {
    GetAPI().Settings().Import();
  },
  clearAll({commit}) {
    GetAPI().Settings().ClearAll();
  },
  getSettings({commit}) {
    const data = GetAPI().Settings().Get();
    commit("setSettings", data);
  },
  saveSettings({commit, dispatch}, settings: ISettings) {
    GetAPI().Settings().Put(settings);
    dispatch("getSettings", {});
  },

};

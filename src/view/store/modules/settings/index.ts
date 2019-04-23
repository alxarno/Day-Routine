import { Module } from "vuex";
import { ISettingsState } from "./types";
import { IRootState } from "../../types";

import {actions} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const state: ISettingsState = {
    menu_active_item: 0,
    data: {
      Notifications: true,
      DeadZoneNotifications: true,
    },
};

const namespaced: boolean = true;

export const settings: Module<ISettingsState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

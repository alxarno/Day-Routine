import { Module } from "vuex";

import {getters} from "./getters";
import {actions} from "./actions";
import {mutations} from "./mutations";
import { IRootState } from "../../types";

import {
  IDeadZoneState,
  SET_CURRENT_ITEM,
  NEW_DEAD_ZONE,
  LOAD_DEAD_ZONES,
  SAVE_CANGED_DEAD_ZONE,
  DELETE_DEAD_ZONE,
} from "./types";

export const state: IDeadZoneState = {
    currentItem: -1,
    items: [],
};

const namespaced: boolean = true;

export const deadZonesJoin = (action: string) => `deadZones/${action}`;

export const deadZones: Module<IDeadZoneState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export {
  SET_CURRENT_ITEM,
  NEW_DEAD_ZONE,
  LOAD_DEAD_ZONES,
  SAVE_CANGED_DEAD_ZONE,
  DELETE_DEAD_ZONE,
};

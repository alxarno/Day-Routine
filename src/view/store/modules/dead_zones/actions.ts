import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import {
  IDeadZoneState,
  SET_CURRENT_ITEM,
  SetActiveDeadZone,
  NEW_DEAD_ZONE,
  LoadedDeadZones,
  LOAD_DEAD_ZONES,
  SAVE_CANGED_DEAD_ZONE,
  DELETE_DEAD_ZONE,
} from "./types";
import { GetAPI } from "src/view/external.api";
import { IDeadZone } from "src/models/dead_zone";
import { appJoin, SET_FREE_HOURS } from "../app";

export const actions: ActionTree<IDeadZoneState, IRootState> = {
  [SET_CURRENT_ITEM]: ({commit}, val: number) => {
    commit(SetActiveDeadZone, val);
  },

  [NEW_DEAD_ZONE]: async ({commit, dispatch}) => {
    commit(SetActiveDeadZone, -1);
    const deadZone: IDeadZone = {
      ID: -1,
      name: "Yet another DZ",
      start: 0,
      done: 1,
      enable: false,
      disabledDays: [],
    };
    await GetAPI().DeadZones().Create(deadZone);
    const deadZones = await GetAPI().DeadZones().Get();
    commit(LoadedDeadZones, deadZones);
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  [LOAD_DEAD_ZONES]: async ({commit}) =>  {
    const deadZones = await GetAPI().DeadZones().Get();
    commit(LoadedDeadZones, deadZones);
  },

  [SAVE_CANGED_DEAD_ZONE]: async ({commit, dispatch}, deadZone: IDeadZone) => {
    await GetAPI().DeadZones().Update(deadZone);
    const deadZones = await GetAPI().DeadZones().Get();
    commit(LoadedDeadZones, deadZones);
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  [DELETE_DEAD_ZONE]: async ({commit, dispatch}, deadZone: IDeadZone) => {
    commit(SetActiveDeadZone,  -1);
    await GetAPI().DeadZones().Delete({ID: deadZone.ID});
    const deadZones = await GetAPI().DeadZones().Get();
    commit(LoadedDeadZones, deadZones);
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

};

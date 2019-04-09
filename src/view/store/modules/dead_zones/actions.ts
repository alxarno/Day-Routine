import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import { IDeadZoneState } from "./types";
import { GetAPI } from "src/view/external.api";
import { IDeadZone } from "src/models/dead_zone";

export const actions: ActionTree<IDeadZoneState, IRootState> = {
    setCurrentItem({commit}, val: number) {
      commit("setActiveDeadZone",  val);
    },
    async newDeadZone({commit, dispatch}) {
      commit("setActiveDeadZone", -1);
      const deadZone: IDeadZone = {
        ID: -1,
        name: "Yet another DZ",
        start: 0,
        done: 1,
        enable: false,
        disabled_days: [],
      };
      await GetAPI().DeadZones().Create(deadZone);
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", deadZones);
      dispatch("app/setFreeHours", {}, {root: true});
    },
    async loadDeadZones({commit}) {
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", deadZones);
    },
    async saveChangedDeadZone({commit, dispatch}, deadZone: IDeadZone) {
      await GetAPI().DeadZones().Update(deadZone);
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", deadZones);
      dispatch("app/setFreeHours", {}, {root: true});
    },
    async deleteDeadZone({commit, dispatch}, deadZone: IDeadZone) {
      commit("setActiveDeadZone",  -1);
      await GetAPI().DeadZones().Delete({ID: deadZone.ID});
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", deadZones);
      dispatch("app/setFreeHours", {}, {root: true});
    },
};

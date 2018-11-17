import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IDeadZoneState } from "./types";
import { GetAPI } from "src/view/external.api";
import { DeadZone } from "src/models/dead_zone";

export const actions: ActionTree<IDeadZoneState, RootState> = {
    setCurrentItem({commit}, number: number) {
      commit("setActiveDeadZone", {number});
    },
    async newDeadZone({commit}) {
      commit("setActiveDeadZone", {number: -1});
      // HERE
      const deadZone: DeadZone = {
        ID: -1,
        name: "Yet another DZ",
        start: 0,
        done: 1,
        enable: false,
        disabled_days: [],
      };
      await GetAPI().DeadZones().Create(deadZone);
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", {deadZones});
    },
    async loadDeadZones({commit}) {
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", {deadZones});
    },
    async saveChangedDeadZone({commit}, dead_zone: DeadZone) {
      // console.log(dead_zone)
      await GetAPI().DeadZones().Update(dead_zone);
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", {deadZones});
    },
    async deleteDeadZone({commit}, dead_zone: DeadZone) {
      commit("setActiveDeadZone", {number: -1});
      await GetAPI().DeadZones().Delete({ID: dead_zone.ID});
      const deadZones = await GetAPI().DeadZones().Get();
      commit("loadedDeadZones", {deadZones});
    },
};

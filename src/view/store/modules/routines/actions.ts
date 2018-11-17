import { ActionTree } from "vuex";
import { RootState } from "../../types";
import { IRoutinesState } from "./types";
import { Routine } from "src/models/routines.routine";
import { GetAPI } from "src/view/external.api";
import {DrawerContent, ModalContent} from "../../api";

export const actions: ActionTree<IRoutinesState, RootState> = {
  newRoutineWindow({commit}) {
    commit("app/drawerOpen", DrawerContent.Routine,  { root: true });
  },
  routineSettingsWindow({commit}) {
    commit("app/drawerOpen", DrawerContent.RoutineSettings,  { root: true });
  },
  currentRoutineChange({commit}, val: number) {
    commit("setCurrentRoutine", val);
  },
  async addRoutine({commit}, routine: Routine) {
    await GetAPI().Routines().Create(routine);
    const routines = await GetAPI().Routines().Get();
    commit("loadedRoutines", routines);

    commit("setCurrentRoutine",  -1);
    commit("drop");
    commit("app/drawerClose", {}, { root: true });
  },
  async deleteRoutine({commit}, routine: Routine) {
    // console.log(routine);
    await GetAPI().Routines().Delete({ID: routine.ID});
    const routines = await GetAPI().Routines().Get();
    commit("loadedRoutines", routines);
  },
  openRoutineSettings({commit}, id: number) {
    commit("drop");
    commit("setCurrentRoutine", id);
    commit("app/drawerClose", {}, { root: true });
    commit("routineSettingsWindow");

  },
  async loadRoutines({commit}) {
      commit("loaded");
      const routines = await GetAPI().Routines().Get();
      commit("loadedRoutines", routines);
  },
  async saveRoutine({commit}, routine: Routine) {
    await GetAPI().Routines().Update(routine);
    commit("loaded");
    const routines = await GetAPI().Routines().Get();
    commit("loadedRoutines", routines);
  },
};

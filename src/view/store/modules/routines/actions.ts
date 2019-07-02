import { ActionTree } from "vuex";
import { IRootState } from "../../types";
import {
  IRoutinesState,
  IRoutinesActions,
  NEW_ROUTINE_WINDOW,
  ROUTINE_SETTINGS_WINDOW,
  CURRENT_ROUTINE_CHANGE,
  ADD_ROUTINE, DELETE_ROUTINE,
  LOAD_ROUTINES,
  SAVE_ROUTINES,
  CHANGE_STATISTICS,
  SET_ROUTINE_GRAPH,
  UPDATE_CURRENT_ROUTINE,
  SetCurrentRoutine,
  Drop,
  LoadedRoutines,
  SetCurrentGraphPanel,
  SetRoutine,
 } from "./types";
import { IRoutine } from "src/models/routines.routine";
import { GetAPI } from "src/view/external.api";
import {DrawerContent} from "../../api";
import IStatistics from "src/models/statistics";
import { appJoin, DRAWER_ACTION, SET_FREE_HOURS } from "../app";

export const actions: ActionTree<IRoutinesState, IRootState> & IRoutinesActions = {
  [NEW_ROUTINE_WINDOW]: ({commit, dispatch}): void => {
    dispatch(appJoin(DRAWER_ACTION), DrawerContent.Routine,  { root: true });
  },

  [ROUTINE_SETTINGS_WINDOW]: ({commit, dispatch}) => {
    dispatch(appJoin(DRAWER_ACTION), DrawerContent.RoutineSettings,  { root: true });
  },

  [CURRENT_ROUTINE_CHANGE]: ({commit}, val: number) => {
    commit(SetCurrentRoutine, val);
  },

  [ADD_ROUTINE]: async ({commit, dispatch}, routine: IRoutine) => {
    await GetAPI().Routines().Create(routine);
    dispatch(LOAD_ROUTINES, {});
    commit(SetCurrentRoutine,  -1);
    commit(Drop);
    dispatch(appJoin(DRAWER_ACTION), -1,  { root: true });
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  [DELETE_ROUTINE]: async ({commit, dispatch}, routine: IRoutine) => {
    await GetAPI().Routines().Delete({ID: routine.ID});
    dispatch(LOAD_ROUTINES, {});
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  [LOAD_ROUTINES]: async ({commit}) => {
    // commit("loading");
    const routines = await GetAPI().Routines().Get();
    const statistics = await GetAPI().Statistics().Get();
    routines.forEach((v: IRoutine) => {
      statistics.forEach((s: IStatistics) => {
        if (v.ID === s.ID) {
          v.hoursSpended = s.spent;
        }
      });
    });
    commit(LoadedRoutines, routines);
  },

  [SAVE_ROUTINES]: async ({commit, dispatch}, routine: IRoutine) => {
    commit(SetCurrentGraphPanel, -1);
    await GetAPI().Routines().Update(routine);
    dispatch(LOAD_ROUTINES, {});
    dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
  },

  [CHANGE_STATISTICS]: async ({commit, dispatch}, data: {routineID: number, spent: number[]}) => {
    await GetAPI().Statistics().ChangeSpent(data);
    dispatch(UPDATE_CURRENT_ROUTINE, data.routineID);
  },

  [SET_ROUTINE_GRAPH]: async ({commit, dispatch}, routineID: number) => {
    console.log(SetCurrentGraphPanel, routineID);
    commit(SetCurrentGraphPanel, routineID);
  },

  [UPDATE_CURRENT_ROUTINE]: async ({commit, dispatch}, routineID: number) => {
   const routines = await GetAPI().Routines().Get();
   const statistics = await GetAPI().Statistics().Get();
   routines.forEach((r, i) => {
     if (r.ID === routineID) {
       r.hoursSpended = statistics.reduce((a, s) => {
         if (s.routineID === routineID) {
           return s.spent;
         } else {
           return a;
         }
       }, r.hoursSpended);
       commit(SetRoutine, {routine: r, index: i});
     }
   });
  },
};

// export const actions:  = {
//   newRoutineWindow({commit, dispatch}) {
//     dispatch(appJoin(DRAWER_ACTION), DrawerContent.Routine,  { root: true });
//   },
//   routineSettingsWindow({commit, dispatch}) {
//     dispatch(appJoin(DRAWER_ACTION), DrawerContent.RoutineSettings,  { root: true });
//   },
//   currentRoutineChange({commit}, val: number) {
//     commit("setCurrentRoutine", val);
//   },
//   async addRoutine({commit, dispatch}, routine: IRoutine) {
//     await GetAPI().Routines().Create(routine);
//     dispatch("loadRoutines", {});
//     commit("setCurrentRoutine",  -1);
//     commit("drop");
//     dispatch(appJoin(DRAWER_ACTION), -1,  { root: true });
//     dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
//   },
//   async deleteRoutine({commit, dispatch}, routine: IRoutine) {
//     await GetAPI().Routines().Delete({ID: routine.ID});
//     dispatch("loadRoutines", {});
//     dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
//   },
//   async loadRoutines({commit}) {
//       commit("loading");
//       const routines = await GetAPI().Routines().Get();
//       const statistics = await GetAPI().Statistics().Get();
//       routines.forEach((v: IRoutine) => {
//         statistics.forEach((s: IStatistics) => {
//           if (v.ID === s.ID) {
//             v.hoursSpended = s.spent;
//           }
//         });
//       });
//       commit("loadedRoutines", routines);
//   },
//   async saveRoutine({commit, dispatch}, routine: IRoutine) {
//     commit("setCurrentRoutine", -1);
//     await GetAPI().Routines().Update(routine);
//     dispatch("loadRoutines", {});
//     dispatch(appJoin(SET_FREE_HOURS), {}, {root: true});
//   },
//   async changeStatistics({commit, dispatch}, data: {routineID: number, spent: number[]}) {
//     await GetAPI().Statistics().ChangeSpent(data);
//     dispatch("updateCurrentRoutine", data.routineID);

//   },
//   setRoutineGraph({commit, dispatch}, routineID: number) {
//     commit("setCurrentGraphPanel", routineID);
//   },

//   async updateCurrentRoutine({commit, dispatch}, routineID: number) {
//     const routines = await GetAPI().Routines().Get();
//     const statistics = await GetAPI().Statistics().Get();
//     routines.forEach((r, i) => {
//       if (r.ID === routineID) {
//         r.hoursSpended = statistics.reduce((a, s) => {
//           if (s.routineID === routineID) {
//             return s.spent;
//           } else {
//             return a;
//           }
//         }, r.hoursSpended);
//         commit("setRoutine", {routine: r, index: i});
//       }
//     });

//   },

// };

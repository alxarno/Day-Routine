import { IRoutine } from "src/models/routines.routine";

export interface IRoutinesState {
  current_routine: number;
  routine_settings_open: boolean;
  new_routine_open: boolean;
  routineGraph: number;
  loaded: boolean;
  items: IRoutine[];
}

export const NEW_ROUTINE_WINDOW = "newRouteineWindow";
export const ROUTINE_SETTINGS_WINDOW = "routineSettingsWindow";
export const CURRENT_ROUTINE_CHANGE = "currentRoutineChange";
export const ADD_ROUTINE = "addRoutine";
export const DELETE_ROUTINE = "deleteRoutine";
export const LOAD_ROUTINES = "loadRoutines";
export const SAVE_ROUTINES = "saveRoutine";
export const CHANGE_STATISTICS = "changeStatistics";
export const SET_ROUTINE_GRAPH = "setRoutineGraph";
export const UPDATE_CURRENT_ROUTINE = "updateCurrentRoutine";

export interface IRoutinesActions {
  [NEW_ROUTINE_WINDOW]: (helpers: any) => void;
  [ROUTINE_SETTINGS_WINDOW]: (helpers: any) => void;
  [CURRENT_ROUTINE_CHANGE]: (helpers: any, val: number) => void;
  [ADD_ROUTINE]: (helpers: any, routine: IRoutine) => void;
  [DELETE_ROUTINE]: (helpers: any, routine: IRoutine) => void;
  [LOAD_ROUTINES]: (helpers: any) => void;
  [SAVE_ROUTINES]: (helpers: any, routine: IRoutine) => void;
  [CHANGE_STATISTICS]: (helpers: any, data: {routineID: number, spent: number[]}) => void;
  [SET_ROUTINE_GRAPH]: (helpers: any, routineID: number) => void;
  [UPDATE_CURRENT_ROUTINE]: (helpers: any, routineID: number) => void;
}

export const NewRoutineWindow = "newRoutineWindow";
export const Drop = "drop";
export const RoutineSettingsWindow = "routineSettingsWindow";
export const SetCurrentRoutine = "setCurrentRoutine";
export const LoadedRoutines = "loadedRoutines";
// export const Loading = "loading"
export const SetCurrentGraphPanel = "setCurrentGraphPanel";
export const SetRoutine = "setRoutine";

export interface IRoutinesMutations {
  [NewRoutineWindow]: (state: IRoutinesState) => void;
  [Drop]: (state: IRoutinesState) => void;
  [RoutineSettingsWindow]: (state: IRoutinesState) => void;
  [SetCurrentGraphPanel]: (state: IRoutinesState, val: number) => void;
  [LoadedRoutines]: (state: IRoutinesState, val: IRoutine[]) => void;
  [SetRoutine]: (state: IRoutinesState, data: {index: number, routine: IRoutine}) => void;
}

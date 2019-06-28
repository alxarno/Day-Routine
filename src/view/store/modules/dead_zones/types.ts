import { IDeadZone } from "src/models/dead_zone";

export interface IDeadZoneState {
  currentItem: number;
  items: IDeadZone[];
}

export const SET_CURRENT_ITEM = "setCurrentItem";
export const NEW_DEAD_ZONE = "newDeadZone";
export const LOAD_DEAD_ZONES = "loadDeadZones";
export const SAVE_CANGED_DEAD_ZONE = "saveChangedDeadZone";
export const DELETE_DEAD_ZONE = "deleteDeadZone";

export interface IDeadZonesActions {
  [SET_CURRENT_ITEM]: (helpers: any, val: number) => void;
  [NEW_DEAD_ZONE]: (helpers: any) => void;
  [LOAD_DEAD_ZONES]: (helpers: any) => void;
  [SAVE_CANGED_DEAD_ZONE]: (helpers: any, deadZone: IDeadZone) => void;
  [DELETE_DEAD_ZONE]: (helpers: any, deadZone: IDeadZone) => void;
}

export const SetActiveDeadZone = "setActiveDeadZone";
export const CreateNewDeadZone = "createNewDeadZone";
export const LoadedDeadZones = "loadedDeadZones";

export interface IDeadZoneMutations {
  [SetActiveDeadZone]: (state: IDeadZoneState, value: number) => void;
  [CreateNewDeadZone]: (state: IDeadZoneState) => void;
  [LoadedDeadZones]: (staet: IDeadZoneState, deadZones: IDeadZone[]) => void;
}

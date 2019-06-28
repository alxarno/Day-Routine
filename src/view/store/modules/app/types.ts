import {DrawerContent} from "../../api";
import { ISnackBar, SnackBarType, ISnackBarContent } from "src/models/snackbar";
import { IModal } from "src/models/modals";

export interface IAppState {
  menuActiveItem: number;
  modal: boolean;
  modalEntity: IModal | null;
  drawer: boolean;
  drawerContent: DrawerContent;
  freeHours: number;
  snackbars: ISnackBar[];
}

export const SET_MENU_ITEM = "setMenuItem";
export const DRAWER_ACTION = "drawerAction";
export const MODAL_ACTION = "modalAction";
export const SHOW_MODAL = "showModal";
export const CLOSE_MODAL = "closeModal";
export const SET_FREE_HOURS = "setFreeHours";
export const SHOW_SNACK_BAR = "showSnackBar";
export const CLOSE_SNACK_BAR = "closeSnackBar";
export const SNACK_BAR_ACTION = "snackBarAction";

export interface IAppActions {
  [SET_MENU_ITEM]: (helpers: any, val: number) => void;
  [DRAWER_ACTION]: (helpers: any, val: DrawerContent | -1) => void;
  [MODAL_ACTION]: (helpers: any, val: IModal | -1) => void;
  [SHOW_MODAL]: (helpers: any, modal: IModal) => void;
  [CLOSE_MODAL]: (helpers: any, data: any) => void;
  [SET_FREE_HOURS]: (helpers: any) => void;
  [SHOW_SNACK_BAR]: (helpers: any, data: {snackBarType: SnackBarType, content: ISnackBarContent}) => void;
  [CLOSE_SNACK_BAR]: (helpers: any, ID: number) => void;
  [SNACK_BAR_ACTION]: (helpers: any, data: {answer: boolean, ID: number}) => void;
}

export const SetMenuActiveItem = "setMenuActiveItem";
export const DrawerOpen = "drawerOpen";
export const DrawerClose = "drawerClose";
export const ModalOpen = "modalOpen";
export const ModalClose = "modalClose";
export const SetFreeHours = "setFreeHours";
export const AddSnackBar = "addSnackBar";
export const DeleteSnackBar = "deleteSnackBar";
export const HideSnackBar = "hideSnackBar";
export const UpdateTimeoutSnackBar = "updateTimeoutSnackBar";
export const ExecuteSnackBar = "executeSnackBar";

export interface IAppMutations {
  [SetMenuActiveItem]: (state: IAppState, item: number) => void;
  [DrawerOpen]: (state: IAppState, content: DrawerContent) => void;
  [ModalOpen]: (state: IAppState, modal: IModal) => void;
  [ModalClose]: (state: IAppState, data: any) => void;
  [SetFreeHours]: (state: IAppState, hours: number) => void;
  [AddSnackBar]: (state: IAppState, data: ISnackBar) => void;
  [DeleteSnackBar]: (state: IAppState, ID: number) => void;
  [HideSnackBar]: (state: IAppState, ID: number) => void;
  [UpdateTimeoutSnackBar]: (state: IAppState, data: {ID: number, newTimer: NodeJS.Timeout}) => void;
  [ExecuteSnackBar]: (state: IAppState, data: {ID: number, answer: boolean}) => void;
}

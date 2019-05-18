import {DrawerContent, ModalContent} from "../../api";
import { ISnackBar } from "src/models/snackbar";
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

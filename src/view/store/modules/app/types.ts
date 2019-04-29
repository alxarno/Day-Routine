import {DrawerContent, ModalContent} from "../../api";
import { ISnackBar } from "src/models/snackbar";

export interface IAppState {
  menuActiveItem: number;
  modal: boolean;
  modalContent: ModalContent;
  drawer: boolean;
  drawerContent: DrawerContent;
  freeHours: number;
  snackbars: ISnackBar[];
}

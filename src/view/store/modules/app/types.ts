import {DrawerContent, ModalContent} from "../../api";

export interface IAppState {
  menuActiveItem: number;
  modal: boolean;
  modalContent: ModalContent;
  drawer: boolean;
  drawerContent: DrawerContent;
  freeHours: number;
}

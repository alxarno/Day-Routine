import { ISnackBarContent, SnackBarType } from "src/models/snackbar";
import { IModal } from "src/models/modals";

export interface IUserInterface {
  ShowSnackBar: (snackBarType: SnackBarType, content: ISnackBarContent) => void;
  ShowModal: (modal: IModal) => void;
}

import { ISnackBarContent, SnackBarType } from "src/models/snackbar";

export interface IUserInterface {
  ShowSnackBar: (snackBarType: SnackBarType, content: ISnackBarContent) => void;
}

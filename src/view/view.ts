import Vue from "vue";
import Vuex, { mapGetters, Store } from "vuex";
import store from "./store/index";
import { ICore } from "src/interfaces/core";
import { RegisterAPI } from "./external.api";
import MainComponent from "./components/main";
import { IUserInterface } from "src/interfaces/ui";
import { IRootState } from "./store/types";
import { ISnackBar, SnackBarType, ISnackBarContent } from "src/models/snackbar";

class UserInterface implements IUserInterface {
  private store: Store<IRootState>;
  private ui: Vue;

  constructor(core: ICore) {
    this.store = store;
    RegisterAPI(core);
    this.ui = new Vue({
      el: "#app",
      template: `
      <div>
        <MainComponent/>
      </div>`,
      store,
      components: {
        MainComponent,
      },
      data: {
        style: {
          filter: "blur(5px)",
        },
      },
      methods: {
        blurShow(): boolean {
          return this.$store.state.app.popup_open;
        },
      },
    });
  }

  public ShowSnackBar(snackBarType: SnackBarType, content: ISnackBarContent) {
    this.store.dispatch("app/showSnackBar", {snackBarType, content}, {root: true});
  }
}

export default UserInterface;

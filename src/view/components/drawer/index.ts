import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import CloseButton from "./elements/close";
import RoutineComponent from "./routine";
import SettingsComponent from "./settings";
import * as WithRender from "./template.html";

require("./styles.scss");

const routineNamespace: string = "routines";
const appNamespace: string = "app";

@WithRender
@Component({
  components: {
    SettingsComponent,
    RoutineComponent,
    CloseButton,
  },
})
export default class Drawer extends Vue {
  @State("routine_settings_open", {namespace: routineNamespace}) private routineSettingsOpen: any;
  @State("current_routine", {namespace: routineNamespace}) private currentRoutine: any;
  @State("new_routine_open", {namespace: routineNamespace}) private newRoutineOpen: any;

  @Action("closePopUp", {namespace: appNamespace}) private closePopUp: any;

  @State("settings_open", {namespace: appNamespace}) private settingsOpen: any;
  @State("popup_open", {namespace: appNamespace}) private popupOpen: any;
  private close() {
    this.closePopUp();
  }

}

import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";

import HeaderComponent from "./header";
import NowComponent from "./schedule";
import RoutinesComponent from "./routines";
import DeadZonesComponent from "./dead_zones";
import ModalsComponent from "./modals";
import DrawerComponent from "./drawer";
import SnackBars from "./snackbars";

import * as WithRender from "./template.html";

const namespace: string = "app";

@WithRender
@Component({
  components: {
    HeaderComponent,
    NowComponent,
    RoutinesComponent,
    DrawerComponent,
    DeadZonesComponent,
    SnackBars,
    ModalsComponent,
  },
})
export default class MainComponent extends Vue {
  @State("menuActiveItem", {namespace}) private menuActiveItem?: number;
  @State("drawer", {namespace}) private drawer?: boolean;
  @State("modal", {namespace}) private modal?: boolean;

  @Action("getSettings", {namespace: "settings"}) private getSettings: any;

  private style = {
    filter: "blur(5px)",
  };

  private created() {
    this.getSettings();
  }

  private bacClick() {
    console.log("Close");
  }

  // @Action('newRoutineWindow', { namespace }) newRoutineWindow: any;
  // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;

}

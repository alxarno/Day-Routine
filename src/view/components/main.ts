import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";

import HeaderComponent from "./header";
import NowComponent from "./schedule";
import RoutinesComponent from "./routines";
import DeadZonesComponent from "./dead_zones";
import ModalsComponent from "./modals";
import DrawerComponent from "./drawer";

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
  },
})
export default class MainComponent extends Vue {
  @State("menu_active_item", {namespace}) public menuActiveItem: any;
  @State("popup_open", {namespace}) public popupOpen: any;

  public style = {
    filter: "blur(5px)",
  };
  @Action("closePopUp", {namespace}) private closePopUp: any;
  private clickEnable = false;

  // @Action('newRoutineWindow', { namespace }) newRoutineWindow: any;
  // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;

}

import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import RoutineComponent from "./routine";
import SettingsComponent from "./settings";
import * as WithRender from "./template.html";
import {DrawerContent} from "src/view/store/api";

require("./styles.scss");

const appNamespace: string = "app";

@WithRender
@Component({
  components: {
    SettingsComponent,
    RoutineComponent,
  },
})
export default class Drawer extends Vue {
  @State("drawer", {namespace: appNamespace}) private drawer?: boolean;
  @State("drawerContent", {namespace: appNamespace}) private drawerContent?: DrawerContent;
  @Action("drawerAction", {namespace: appNamespace}) private drawerClose?: (arg: number) => void;

  private close() {
    if (this.drawerClose) {this.drawerClose(-1); }
  }

}

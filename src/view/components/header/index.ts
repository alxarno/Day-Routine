import Vue from "vue";
import Component from "vue-class-component";
import SettingsComponent from "./settings-icon";

import {Action, State} from "vuex-class";
import * as WithRender from "./template.html";
import menu from "src/view/components/cons";

require("./styles.scss");

const namespace: string = "app";
@WithRender
@Component({
  components: { SettingsComponent},
})
export default class Header extends Vue {
  @Action("setMenuItem", { namespace }) public setMenuItem?: (arg: number) => void;
  @State("menuActiveItem", {namespace}) public menuActiveItem?: number;

  public menu: any =  menu;

  public change(val: number): void {
    if (this.setMenuItem) {this.setMenuItem(val); }
  }
}

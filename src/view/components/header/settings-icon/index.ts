import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import {Action} from "vuex-class";
import {DrawerContent} from "src/view/store/api";

require("./styles.scss");
const icon = require("assets/settings.svg");

const namespace: string = "app";

@WithRender
@Component({})
export default class SettingsIcon extends Vue {
  @Action("drawerAction", { namespace }) public drawerAction?: (arg: number) => void;

  public icon: string = icon;

  public change(): void {
    if (this.drawerAction) {this.drawerAction(DrawerContent.Settings); }
    // this.$store.dispatch("openPopUp")
    // this.$store.dispatch('settingsOpenChange')
  }
}

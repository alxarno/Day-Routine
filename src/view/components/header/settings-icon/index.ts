import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./templates.html";
import {Action, State} from "vuex-class";

require("./styles.scss");
const icon = require("assets/settings.svg");

const namespace: string = "app";

@WithRender
@Component({})
export default class SettingsIcon extends Vue {
  @Action("settingsOpenChange", { namespace }) public settingsOpen: any;

  public icon: string = icon;

  public change(): void {
    this.settingsOpen();
    // this.$store.dispatch("openPopUp")
    // this.$store.dispatch('settingsOpenChange')
  }
}

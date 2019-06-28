import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
// tslint:disable-next-line
const prod = (window as any).require("electron").remote.getGlobal("CONFIG").PROD
const shell = (window as any).require("electron").remote.shell;

import MenuComponent from "./menu";
import DataComponent from "./data";
import OthersComponent from "./other";
import DebugMenu from "./debug";
import SyncComponent from "./sync";

require("./styles.scss");

const help = require("assets/help.svg");

@WithRender
@Component({
  components: {
    MenuComponent,
    DataComponent,
    OthersComponent,
    DebugMenu,
    SyncComponent,
  },
})
export default class SettingsComponent extends Vue {
  private PROD = prod;
  private icon: string = help;
  private helpLink: string = "https://github.com/AlexeyArno/Day-Routine/wiki";

  private created() {
    // console.log(shell);
  }

  get menuActiveItem(): number {
    return this.$store.state.settings.menu_active_item;
  }

  private openHelp() {
    shell.openExternal(this.helpLink);
  }

}

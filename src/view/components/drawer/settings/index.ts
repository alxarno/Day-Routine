import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
// tslint:disable-next-line
const prod = (window as any).require("electron").remote.getGlobal("CONFIG").PROD

import MenuComponent from "./menu";
import DataComponent from "./data";
import OthersComponent from "./other";
import DebugMenu from "./debug";

require("./styles.scss");

@WithRender
@Component({
  components: {
    MenuComponent,
    DataComponent,
    OthersComponent,
    DebugMenu,
  },
})
export default class SettingsComponent extends Vue {
  private PROD = prod;

  private created() {
    // console.log(this.PROD);
  }

  get menuActiveItem(): number {
    return this.$store.state.settings.menu_active_item;
  }

}

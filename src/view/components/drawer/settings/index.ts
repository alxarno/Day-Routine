import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";

import MenuComponent from "./menu";
import DataComponent from "./data";
import OthersComponent from "./other";

require("./styles.scss");

@WithRender
@Component({
  components: {
    MenuComponent,
    DataComponent,
    OthersComponent,
  },
})
export default class SettingsComponent extends Vue {

  get menuActiveItem(): number {
    return this.$store.state.settings.menu_active_item;
  }

}

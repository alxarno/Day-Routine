import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";

import MenuComponent from "./menu";
import DataComponent from "./data";

require("./styles.scss");

@WithRender
@Component({
  components: {
    MenuComponent,
    DataComponent,
  },
})
export default class SettingsComponent extends Vue {

  get menuActiveItem(): number {
    return this.$store.state.settings.menu_active_item;
  }

}

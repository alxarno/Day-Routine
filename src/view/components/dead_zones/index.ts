import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import * as WithRender from "./template.html";
import DeadZoneComponent from "./dead_zone";
import NewButton from "src/view/default-components/new-button";
import FreeHours from "src/view/default-components/free-hours";
require("./styles.scss");

const searchIcon = require("assets/search.svg");
const namespace: string = "deadZones";

@WithRender
@Component({
  components: {
    DeadZoneComponent,
    NewButton,
    FreeHours,
  },
})
export default class DeadZones extends Vue {
  @State("items", {namespace}) public deadZonesItems: any;
  @State("currentItem", {namespace}) public currentItem: any;

  @Action("setCurrentItem", { namespace }) public setCurrentItem: any;
  @Action("loadDeadZones", { namespace }) public loadDeadZones: any;
  @Action("newDeadZone", {namespace}) public newDeadZone: any;

  public searchIcon: string = searchIcon;
  public searchRequest: string = "";

  public mounted() {
    this.loadDeadZones();
  }

  public change(index: number) {
    if (index === (this.currentItem as number)) {
      this.setCurrentItem(-1);
    } else {
      this.setCurrentItem(index);
    }
  }

  public newDeadZoneHandler(): void {
    this.newDeadZone();
  }
}

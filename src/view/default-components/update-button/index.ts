import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");
const refreshIcon = require("assets/refresh.svg");

import {TooltipsPositions} from "../interfaces";

@WithRender
@Component({
  props: {
    click: Function,
    tooltipText: String,
    tooltipPosition: String,
  },
})
export default class UpdateButtonComponent extends Vue {
  private refreshIcon: string = refreshIcon;
  private tText: string = "";
  private tPos: string = "";

  public mounted() {
    this.tText = this.$props.tooltipText;
    this.tPos = this.$props.tooltipPosition;
  }

  private onclick(): void {
    this.$props.click();
  }
}

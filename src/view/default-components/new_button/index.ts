import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");
const addIcon = require("assets/add.svg");

@WithRender
@Component({
  props: {
    click: Function,
  },
})
export default class ButtonComponent extends Vue {
  public addIcon: string = addIcon;

  public onclick(): void {
    this.$props.click();
  }
}

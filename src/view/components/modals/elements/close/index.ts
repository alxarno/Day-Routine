import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import { Action} from "vuex-class";
const icon = require("assets/close.svg");
require("./styles.scss");

const namespace: string = "app";
@WithRender
@Component({
})
export default class CloseButton extends Vue {

  public icon: string = icon;
  @Action("modalAction", {namespace}) private modalAction!: (arg: number) => void;

  public click() {
    this.modalAction(-1);
    // this.$store.dispatch("closePopUp")
  }
}

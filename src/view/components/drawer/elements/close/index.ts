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
  @Action("closePopUp", { namespace }) public closePopUp: any;

  public icon: string = icon;

  public click() {
    this.closePopUp();
    // this.$store.dispatch("closePopUp")
  }
}

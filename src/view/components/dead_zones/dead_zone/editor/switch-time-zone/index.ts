import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    timeZone: String,
    changeZone: Function,
  },
})
export default class SwitchComponent extends Vue {

  public click() {
    this.$props.changeZone();
  }

}

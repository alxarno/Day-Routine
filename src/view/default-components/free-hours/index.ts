import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import {State} from "vuex-class";
require("./styles.scss");

@WithRender
@Component({})
export default class CheckBox extends Vue {
  @State((state) => state.app.freeHours) private freeHours?: number;

}

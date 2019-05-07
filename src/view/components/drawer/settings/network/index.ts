import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import {State, Action} from "vuex-class";
require("./styles.scss");

import CheckBoxComponent from "src/view/default-components/checkbox";
import { ISettings } from "src/interfaces/settingsStore";

const namespace: string = "settings";
@WithRender
@Component({
  components: {CheckBoxComponent},
})
export default class NetworkComponent extends Vue {
  @State("data", {namespace}) private data!: ISettings;
  @Action("saveSettings", {namespace}) private saveSettings?: (s: ISettings) => void;
  @Action("updateNetworkID", {namespace}) private updateNetworkID!: () => void;

  private recieveFromUnknow(val: boolean) {
    this.data!.RecieveDataFromUnknow = val;
    this.saveSettings!(this.data!);
    return;
  }

  private refresh() {
    this.updateNetworkID();
  }

  private pass() {
    this.saveSettings!(this.data!);
    return;
  }

}

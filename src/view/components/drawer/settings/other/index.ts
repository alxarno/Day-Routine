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
export default class OthersComponent extends Vue {
  @State("data", {namespace}) private data?: ISettings;
  @Action("saveSettings", {namespace}) private saveSettings?: (s: ISettings) => void;

  private notificationCall(val: boolean) {
    this.data!.Notifications = val;
    this.saveSettings!(this.data!);
    return;
  }

  private deadZoneNotificationCall(val: boolean) {
    this.data!.DeadZoneNotifications = val;
    this.saveSettings!(this.data!);
    return;
  }

}

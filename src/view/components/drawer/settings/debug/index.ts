import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

const {notif} = (window as any).require("electron").remote.getGlobal("CONFIG");

@WithRender
@Component({})
export default class DebugMenu extends Vue {

  private showNotif() {
    notif("Test", "Test message");
  }

}

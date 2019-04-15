import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

// import {
//   NotifAction,
// } from "./methods";

const {notif} = (window as any).require("electron").remote.getGlobal("CONFIG");

// notif

@WithRender
@Component({})
export default class DebugMenu extends Vue {

  private showNotif() {
    //
    // NotifAction();
    notif("Test", "Test message");
  }
}

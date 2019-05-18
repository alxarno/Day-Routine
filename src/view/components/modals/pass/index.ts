import Vue from "vue";
import Component from "vue-class-component";
import * as WithHTML from "./template.html";
import { State, Action } from "vuex-class";
import { ModalContent, ISyncPassModalContent } from "src/models/modals";
require("./styles.scss");

const namespace: string = "app";
@WithHTML
@Component({

})
export default class PassSync extends Vue {
  @State("modalEntity", {namespace}) private modal?: ModalContent;
  @Action("closeModal", {namespace}) private closeModal?: ISyncPassModalContent["Callback"];
  private pass: string = "";

  private accept() {
    this.closeModal!(this.pass);
  }

  private dismiss() {
    this.closeModal!("");
  }
}

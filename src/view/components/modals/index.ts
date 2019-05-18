import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import CloseButton from "./elements/close";
import PassSync from "./pass";
import { State, Action } from "vuex-class";
import { ModalContent } from "src/view/store/api";
import { ModalType } from "src/models/modals";

require("./styles.scss");

const namespace: string = "app";

@WithRender
@Component({
  components: {
    CloseButton,
    PassSync,
  },
})
export default class  extends Vue {
  @State("modal", {namespace}) private modalOpen?: boolean;
  @State("modalEntity", {namespace}) private modal?: ModalContent;
  @Action("closeModal", {namespace}) private closeModal?: (data: any) => void;
  private modelContentPassSync = ModalType.SyncPass;

  public close(e: Event) {
    if (e.target !== this.$refs.modal_background) {return; }
    // this.modalAction!(-1);
    this.closeModal!(null);

  }
}

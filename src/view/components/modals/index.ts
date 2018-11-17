import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./modals.html";
import CloseButton from "./elements/close";
import { State, Action } from "vuex-class";

require("./modals.scss");

const routineNamespace: string = "routines";
const appNamespace: string = "app";

@WithRender
@Component({
  components: {
    CloseButton,
  },
})
export default class  extends Vue {

  public close() {
    //
  }
}

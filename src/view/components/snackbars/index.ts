import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import { State } from "vuex-class";
import SnackBar from "./unit";
import { ISnackBar } from "src/models/snackbar";

require("./styles.scss");

@WithRender
@Component({
  components: { SnackBar},
})
export default class SnackBars extends Vue {
  @State((state) => state.app.snackbars) public units!: ISnackBar[];

  public onClick(): void {
    // window.alert(this.message);
  }
}

import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import { State } from "vuex-class";
import { ISnackBar, SnackBarType } from "src/models/snackbar";

require("./styles.scss");

@WithRender
@Component({
  props: {
    data: {
      type: Object as () => ISnackBar,
    },
  },
})
export default class SnackBar extends Vue {

  private  get notifier() {
    return this.$props.data.Type === SnackBarType.Notifier;
  }

  private get error() {
    return this.$props.data.Type === SnackBarType.Error;
  }

  private get newConnection() {
    return this.$props.data.Type === SnackBarType.NewConnection;
  }

  public created() {
    console.log(this.$props.data.Content);
  }

  public onClick(): void {
    // window.alert(this.message);
  }

  private close() {
    //
  }

  private accept() {
    //
  }

  private dismiss() {
    //
  }
}

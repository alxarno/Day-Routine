import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import { State, Action } from "vuex-class";
import { ISnackBar, SnackBarType, ISnackBarTimeOut } from "src/models/snackbar";

require("./styles.scss");
const icon = require("assets/arrow-point-to-right.svg");

const namespace = "app";

@WithRender
@Component({
  props: {
    data: {
      type: Object as () => ISnackBar,
    },
  },
})
export default class SnackBar extends Vue {
  @Action("closeSnackBar", { namespace }) private closeSnackbar!: (ID: number) => void;
  @Action("snackBarAction", { namespace }) private snackBarAction!: (data: {ID: number, answer: boolean}) => void;

  private get notifier() {
    return this.$props.data.Type === SnackBarType.Notifier;
  }

  private get error() {
    return this.$props.data.Type === SnackBarType.Error;
  }

  private get newConnection() {
    return this.$props.data.Type === SnackBarType.NewConnection;
  }

  private icon: string = icon;
  private timelineWidth: string = "100%";
  private interval: NodeJS.Timeout | null = null;

  public created() {
    this.interval = setInterval(() => {
      const timedata: ISnackBarTimeOut = this.$props.data.TimeOut;
      const praticeDelay = 0.018; // just for 0% width when timer done
      const width = (((timedata.Started + timedata.Duration) - new Date().getTime()) / timedata.Duration)
      - praticeDelay;
      this.timelineWidth = width * 100 + "%";
    }, 100);
  }

  public destroyed() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
  }

  public onClick(): void {
    // window.alert(this.message);
  }

  private close() {
    // console.log(this.$props.data.ID);
    this.closeSnackbar(this.$props.data.ID);
  }

  private accept() {
    this.snackBarAction({ID: this.$props.data.ID, answer: true});
  }

  private dismiss() {
    this.snackBarAction({ID: this.$props.data.ID, answer: false});
  }
}

import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import TaskComponent from "./task";

import * as WithRender from "./template.html";

import {
  GetTimes,
  GetScrollTop,
  GetCurrentTime,
  GetCurrentTimeMarginTop,
} from "./methods";

require("./styles.scss");

const namespace: string = "schedule";
@WithRender
@Component({
  components: { TaskComponent},
})
export default class NowComponent extends Vue {
  @State((state) => state.schedule.items) public tasks: any;
  @Action("loadSchedule", { namespace }) public loadSchedule: any;

  public time: string[] = GetTimes();
  public currentTime: string = GetCurrentTime();
  public currentTimeMarginTop: number = GetCurrentTimeMarginTop();

  public mounted() {
    this.loadSchedule();
    const elem: HTMLElement = (this.$refs.now__body as HTMLScriptElement);
    elem.scrollTop = GetScrollTop();
    this.TimeMargin();
  }

  private TimeMargin() {
    this.currentTime = GetCurrentTime();
    this.currentTimeMarginTop = GetCurrentTimeMarginTop();
    const seconds = new Date().getSeconds();
    setTimeout(this.TimeMargin.bind(this), (60 - seconds) * 1000);
  }

}

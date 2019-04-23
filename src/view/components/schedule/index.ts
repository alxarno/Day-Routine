import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import TaskComponent from "./task";
import FreeHours from "src/view/default-components/free-hours";

import * as WithRender from "./template.html";

import RefreshButton from "src/view/default-components/update-button";

import {
  GetTimes,
  GetScrollTop,
  GetCurrentTime,
  GetCurrentTimeMarginTop,
} from "./methods";
import { TooltipsPositions } from "src/view/default-components/interfaces";

require("./styles.scss");

const namespace: string = "schedule";
@WithRender
@Component({
  components: { TaskComponent, FreeHours, RefreshButton},
})
export default class NowComponent extends Vue {
  @State((state) => state.schedule.items) public tasks: any;
  @Action("loadSchedule", { namespace }) public loadSchedule: any;
  @Action("recreateSchedule", { namespace }) public recreateSchedule: any;

  public time: string[] = GetTimes();
  // Key for refresh component every hour
  public key: number = 0;
  public currentTime: string = GetCurrentTime();
  public currentTimeMarginTop: number = GetCurrentTimeMarginTop();
  public tooltipPosition: string = TooltipsPositions.Left;
  public tooltipText: string = "Recreate today's schedule";

  public mounted() {
    this.loadSchedule();
    const elem: HTMLElement = (this.$refs.now__body as HTMLScriptElement);
    elem.scrollTop = GetScrollTop();
    this.TimeMargin();
  }

  public refresh(): void {
    // console.log("refresh");
    this.recreateSchedule();
  }

  private TimeMargin() {
    this.currentTime = GetCurrentTime();
    this.currentTimeMarginTop = GetCurrentTimeMarginTop();
    const seconds = new Date().getSeconds();
    setTimeout(this.TimeMargin.bind(this), (60 - seconds) * 1000);
    if (new Date().getMinutes() === 0) {
      this.key++;
    }
  }

}

import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import TaskComponent from "./task/task";

import * as WithRender from "./index.html";

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
  }

}

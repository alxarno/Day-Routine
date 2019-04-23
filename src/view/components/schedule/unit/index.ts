import Vue from "vue";
import Component from "vue-class-component";

import {INowTask} from "src/models/now.tasks";

import {colors, IColor} from "src/view/color.themes";

import {CheckCurrentTask,
        ComputeWrapperStyle,
        ShortDescribe,
        StartAndDone} from "./methods";
import {IWrapperStyleInterface} from "./interfaces";

import * as WithRender from "./template.html";
import { IScheduleUnit, ScheduleUnitType } from "src/models/schedule.unit";
require("./styles.scss");

@WithRender
@Component({
  props: {
    unit: {
      type: Object as () => IScheduleUnit,
    },
  },
})
export default class ScheduleUnit extends Vue {
  public activeTask: number = 9;
  public curentColor: IColor = colors.default;
  public describe: string = "";
  public taskStart: string = "00:00";
  public taskDone: string = "00:00";
  public wrapperStyle: IWrapperStyleInterface =  {
    "borderLeft": "3px solid ",
    "height": "94px",
    "background": "#ffffff",
    "--box-shadow-color": "#ffffff",
  };
  public currentActiveTask: boolean = false;
  private isItTask: boolean = false;

  public created() {
    // console.log(typeof(this.$props.task));
    this.isItTask = ((this.$props.unit as IScheduleUnit)._type === ScheduleUnitType.Task);
    if (this.isItTask) {
      const task: INowTask = (this.$props.unit.data as INowTask);
      // Change color scheme and style
      this.currentActiveTask = CheckCurrentTask(task.start, task.hours);

      this.curentColor = (colors.hasOwnProperty(task.color) ?
        colors[task.color] : colors.default);

      this.wrapperStyle = ComputeWrapperStyle(this.curentColor, task.hours,
        this.currentActiveTask, this.wrapperStyle);

      // Short describe
      this.describe = ShortDescribe(task.describe, task.hours);

      // Calculate start and done time
      const times = StartAndDone(task.start, task.hours);
      this.taskStart = times.taskStart;
      this.taskDone = times.taskDone;

    }

  }

  public mounted() {
    // console.log(this.$props.task)
  }
}

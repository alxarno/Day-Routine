import Vue from "vue";
import Component from "vue-class-component";

import {NowTask} from "src/models/now.tasks";

import {colors, Color} from "src/view/color.themes";

import {CheckCurrentTask,
        ComputeWrapperStyle,
        ShortDescribe,
        StartAndDone} from "./methods";
import {WrapperStyleInterface} from "./interfaces";

import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    task: {
      type: Object as () => NowTask,
    },
  },
})
export default class Task extends Vue {

  public activeTask: number = 9;
  public curentColor: Color = colors.default;
  public describe: string = "";
  public taskStart: string = "00:00";
  public taskDone: string = "00:00";
  public wrapperStyle: WrapperStyleInterface =  {
    "borderLeft": "3px solid ",
    "height": "94px",
    "background": "#ffffff",
    "--box-shadow-color": "#ffffff",
  };
  public currentActiveTask: boolean = false;

  public created() {
    if (this.$props.task) {
      // Change color scheme and style
      this.currentActiveTask = CheckCurrentTask(this.$props.task.start, this.$props.task.hours);

      this.curentColor = (colors.hasOwnProperty(this.$props.task.color) ?
        colors[this.$props.task.color] : colors.default);

      this.wrapperStyle = ComputeWrapperStyle(this.curentColor, this.$props.task.hours,
        this.currentActiveTask, this.wrapperStyle);

      // Short describe
      this.describe = ShortDescribe(this.$props.task.describe, this.$props.task.hours);

      // Calculate start and done time
      const times = StartAndDone(this.$props.task.start, this.$props.task.hours);
      this.taskStart = times.taskStart;
      this.taskDone = times.taskDone;

    }

  }

  public mounted() {
    // console.log(this.$props.task)
  }
}

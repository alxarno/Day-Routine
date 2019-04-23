import Vue from "vue";
import Component from "vue-class-component";

import {colors, IColor} from "src/view/color.themes";

import {IRoutine} from "src/models/routines.routine";
import Graph from "./graph";

import * as WithRender from "./template.html";
import { Action } from "vuex-class";
const icon = require("assets/controls.svg");
require("./styles.scss");

const namespace: string = "routines";

@WithRender
@Component({
  props: {
    routine: {
      type: Object as () => IRoutine,
    },
  },
  components: {Graph},
})
export default class RoutineComponent extends Vue {
  @Action("currentRoutineChange", { namespace }) public currentRoutineChange?: (arg: number) => void;
  @Action("routineSettingsWindow", { namespace }) public routineSettingsWindow?: () => void;

  public currentColor: IColor = colors.default;
  public downLineWidth: number = 0;
  public settingsIcon: string = icon;

  public created(): void {
    console.log(this.$props.routine.hoursSpended);
    if (colors.hasOwnProperty(this.$props.routine.colorScheme)) {
      this.currentColor = colors[this.$props.routine.colorScheme];
      this.downLineWidth = (this.$props.routine as IRoutine).hoursSpended.reduce((x, y) => x + y) /
        (this.$props.routine as IRoutine).hours * 100;
      this.downLineWidth = (this.downLineWidth > 100 ? 100 : this.downLineWidth);
    }
  }

  public settings(): void {
   if (this.currentRoutineChange && this.routineSettingsWindow) {
    this.currentRoutineChange(this.$props.routine.ID);
    this.routineSettingsWindow();
   }
  }
}

import Vue from "vue";
import Component from "vue-class-component";

import {colors, IColor} from "src/view/color.themes";

import {IRoutine} from "src/models/routines.routine";
import GraphMin from "./graph-min";
import RoutineStatGraphPanel from "./graph-panel";

import * as WithRender from "./template.html";
import { Action, State } from "vuex-class";
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
  components: {GraphMin, RoutineStatGraphPanel},
})
export default class RoutineComponent extends Vue {
  @State((state) => state.routines.routineGraph) public currRoutine?: number;
  // setRoutineGraph
  @Action("setRoutineGraph", { namespace }) public setCurrentGraphPanel?: (arg: number) => void;
  @Action("currentRoutineChange", { namespace }) public currentRoutineChange?: (arg: number) => void;
  @Action("routineSettingsWindow", { namespace }) public routineSettingsWindow?: () => void;

  public currentColor: IColor = colors.default;
  public downLineWidth: number = 0;
  public settingsIcon: string = icon;
  public key: number = 0;

  public created(): void {
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

  private click(): void {
    this.setCurrentGraphPanel!((this.currRoutine === this.$props.routine.ID ? -1 : this.$props.routine.ID));
  }
}

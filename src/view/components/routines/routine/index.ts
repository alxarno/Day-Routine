import Vue from "vue";
import Component from "vue-class-component";

import {colors, IColor} from "src/view/color.themes";

import {IRoutine} from "src/models/routines.routine";
import GraphMin from "./graph-min";
import RoutineStatGraphPanel from "./graph-panel";

import * as WithRender from "./template.html";
import { Action, State } from "vuex-class";
import { SET_ROUTINE_GRAPH, CURRENT_ROUTINE_CHANGE, ROUTINE_SETTINGS_WINDOW } from "src/view/store/modules/routines";
import { IRoutinesState } from "src/view/store/modules/routines/types";
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
  // setRoutineGraph
  @Action(SET_ROUTINE_GRAPH, { namespace }) public setCurrentGraphPanel?: (arg: number) => void;
  @Action(CURRENT_ROUTINE_CHANGE, { namespace }) public currentRoutineChange?: (arg: number) => void;
  @Action(ROUTINE_SETTINGS_WINDOW, { namespace }) public routineSettingsWindow?: () => void;

  public currentColor: IColor = colors.default;
  public downLineWidth: number = 0;
  public settingsIcon: string = icon;
  public key: number = 0;

  @State(namespace) private routines!: IRoutinesState;

  public created(): void {
    console.log(this.routines.current_routine);
    if (colors.hasOwnProperty(this.$props.routine.colorScheme)) {
      this.currentColor = colors[this.$props.routine.colorScheme];
    }
  }

  public downline(): number {
    const downline = (this.$props.routine as IRoutine).hoursSpended.reduce((x, y) => x + y) /
      (this.$props.routine as IRoutine).hours * 100;
    return (downline > 100 ? 100 : downline);
  }

  public settings(): void {
   if (this.currentRoutineChange && this.routineSettingsWindow) {
    this.currentRoutineChange(this.$props.routine.ID);
    this.routineSettingsWindow();
   }
  }

  private click(): void {
    this.setCurrentGraphPanel!(
      (this.routines.current_routine === this.$props.routine.ID
      ? -1
      : this.$props.routine.ID));
  }
}

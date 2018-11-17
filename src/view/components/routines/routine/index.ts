import Vue from "vue";
import Component from "vue-class-component";

import {colors, IColor} from "src/view/color.themes";

import {Routine} from "src/models/routines.routine";

import * as WithRender from "./template.html";
import { Action } from "vuex-class";
const icon = require("assets/controls.svg");
require("./styles.scss");

const namespace: string = "routines";

@WithRender
@Component({
  props: {
    routine: {
      type: Object as () => Routine,
    },
  },
})
export default class RoutineComponent extends Vue {
  @Action("currentRoutineChange", { namespace }) public currentRoutineChange?: (arg: number) => void;
  @Action("routineSettingsWindow", { namespace }) public routineSettingsWindow?: () => void;
  // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;
  // @Action('loadRoutines', { namespace }) loadRoutines: any;

  public curentColor: IColor = colors.default;
  public settingsIcon: string = icon;

  public created(): void {
    if (colors.hasOwnProperty(this.$props.routine.colorScheme)) {
      this.curentColor = colors[this.$props.routine.colorScheme];
    }
  }

  public settings(): void {
    // console.log("Settings ", this.$props.routine.ID)
   if (this.currentRoutineChange && this.routineSettingsWindow) {
    this.currentRoutineChange(this.$props.routine.ID);
    this.routineSettingsWindow();
   }
    // this.$store.dispatch("openPopUp")
    // this.$store.dispatch("currentRoutineChange", {number: this.$props.routine.id})
    // this.$store.dispatch('routineSettingsWindow')
  }
}

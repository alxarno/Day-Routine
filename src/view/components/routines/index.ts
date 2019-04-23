import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import RoutineComponent from "./routine";

import {IRoutine} from "src/models/routines.routine";

import * as WithRender from "./template.html";

import NewButton from "src/view/default-components/new-button";
import FreeHours from "src/view/default-components/free-hours";
import { TooltipsPositions } from "src/view/default-components/interfaces";

require("./styles.scss");

const searchIcon = require("assets/search.svg");
const addIcon = require("assets/add.svg");

const namespace: string = "routines";
@WithRender
@Component({
  components: {
    RoutineComponent,
    NewButton,
    FreeHours,
  },
})
export default class RoutinesComponent extends Vue {
  @State((state) => state.routines.items) private routines?: Array<IRoutine | null>;
  @State((state) => state.routines.loaded) private loaded?: boolean;

  @Action("newRoutineWindow", { namespace }) private newRoutineWindow?: () => void;
  @Action("routineSettingsWindow", { namespace }) private routineSettingsWindow?: () => void;
  @Action("loadRoutines", { namespace }) private loadRoutines?: () => void;

  private searchRequest: string = "";

  private searchIcon: string = searchIcon;
  private addIcon: string = addIcon;
  private tooltipText: string = "Create new routine";
  private tooltipPosition: string = TooltipsPositions.Left;

  public mounted(): void {
    if (this.loadRoutines) {this.loadRoutines(); }
  }

  public newRoutine(): void {
    if (this.newRoutineWindow) {this.newRoutineWindow(); }
  }

  public closeSettings(): void {
    if (this.routineSettingsWindow) {this.routineSettingsWindow(); }
  }

}

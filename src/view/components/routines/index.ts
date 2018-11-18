import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import RoutineComponent from "./routine";

import {Routine} from "src/models/routines.routine";

import * as WithRender from "./template.html";

import NewButton from "src/view/default-components/new_button/new_button";
import FreeHours from "src/view/default-components/free-hours";

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
  @State((state) => state.routines.items) private routines?: Array<Routine | null>;
  @State((state) => state.routines.loaded) private loaded?: boolean;

  @Action("newRoutineWindow", { namespace }) private newRoutineWindow?: () => void;
  @Action("routineSettingsWindow", { namespace }) private routineSettingsWindow?: () => void;
  @Action("loadRoutines", { namespace }) private loadRoutines?: () => void;

  private searchRequest: string = "";

  private searchIcon: string = searchIcon;
  private addIcon: string = addIcon;

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

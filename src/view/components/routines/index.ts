import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import RoutineComponent from "./routine";

import {Routine} from "src/models/routines.routine";

import * as WithRender from "./template.html";

import NewButton from "src/view/default-components/new_button/new_button";

require("./styles.scss");

const searchIcon = require("assets/search.svg");
const addIcon = require("assets/add.svg");

const namespace: string = "routines";
@WithRender
@Component({
  components: {
    RoutineComponent,
    NewButton,
  },
})
export default class RoutinesComponent extends Vue {
  @State((state) => state.routines.items) public routines: Array<Routine | null> = [];
  @State((state) => state.routines.loaded) public loaded: boolean = false;

  @Action("newRoutineWindow", { namespace }) public newRoutineWindow: any;
  @Action("routineSettingsWindow", { namespace }) public routineSettingsWindow: any;
  @Action("loadRoutines", { namespace }) public loadRoutines: any;

  public searchRequest: string = "";

  public searchIcon: string = searchIcon;
  public addIcon: string = addIcon;

  public mounted(): void {
    this.loadRoutines();
  }

  public newRoutine(): void {
    this.newRoutineWindow();
  }

  public closeSettings(): void {
    this.routineSettingsWindow();
  }

}

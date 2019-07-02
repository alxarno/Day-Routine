import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import SliderComponent from "./slider";
import * as WithRender from "./template.html";
require("./styles.scss");

import DropdownComponent from "src/view/default-components/dropdown";

const nothing = require("assets/do-not-disturb-rounded-sign.svg");
const file = require("assets/file.svg");
const link = require("assets/internet.svg");
const pen = require("assets/pen.svg");

import {colors} from "src/view/color.themes";
import { IRoutine } from "src/models/routines.routine";
import { Action as RoutineAction } from "src/models/action";
import { SAVE_ROUTINES, DELETE_ROUTINE, ADD_ROUTINE } from "src/view/store/modules/routines";
import { DRAWER_ACTION } from "src/view/store/modules/app";
import { IRoutinesState } from "src/view/store/modules/routines/types";

const {dialog} = (window as any).require("electron").remote;

const namespace: string = "routines";
const appNamespace: string = "app";

@WithRender
@Component({
  props: {
    routineID: Number,
  },
  components: {
    SliderComponent,
    DropdownComponent,
  },
})

export default class RoutineComponent extends Vue {
  // @State("items", {namespace}) private routines?: IRoutine[];
  // @State("current_routine", {namespace}) private currentRoutineIDStore?: number;
  @State(namespace) private routines!: IRoutinesState;

  @Action(ADD_ROUTINE, { namespace }) private addRoutine: any;
  @Action(DELETE_ROUTINE, { namespace }) private deleteRoutine: any;
  @Action(SAVE_ROUTINES, { namespace }) private saveRoutine: any;
  @Action(DRAWER_ACTION, {namespace: appNamespace}) private drawerAction: any;

  // Icons
  private nothing: string = nothing;
  private file: string = file;
  private link: string = link;
  private pen: string = pen;

  private actionBuffer: string = "";
  private colors: string[] = Object.keys(colors);
  private currentRoutine: IRoutine = {
    ID: -1,
    name: "",
    actionBody: "",
    actionType: RoutineAction.Link,
    colorScheme: Object.keys(colors)[0],
    describe: "",
    hours: 1,
    hoursSpended: [0, 0, 0, 0, 0, 0, 0],
    minDurationHours: 1,
    dayZone: 1,
  };

  private currentColorIndex(): number {
     return Object.keys(colors).indexOf(this.currentRoutine.colorScheme);
  }

  private created() {
    if (this.routines.current_routine !== -1 && this.routines) {
      this.routines.items.forEach((element: IRoutine) => {
        if (element.ID === this.routines.current_routine) {
          this.currentRoutine = {...element};
          return;
        }
      });
    }
  }

  private colorChange(colorScheme: string) {
    this.currentRoutine.colorScheme = colorScheme;
  }

  private click(index: number) {
    if ((index === 2 || index === 1) && this.currentRoutine.actionType !== 3) {
      const l = this.currentRoutine.actionBody;
      this.currentRoutine.actionBody = this.actionBuffer;
      this.actionBuffer = l;
    }
    this.currentRoutine.actionType = index;
  }

  private sliderTriger(num: number) {
    this.currentRoutine.hours = num;
  }

  private minimalHoursSequenceTriger(num: number) {
    this.currentRoutine.minDurationHours = num;
  }

  private chooseFile() {
    const path = dialog.showOpenDialog({
      properties: ["openFile"],
    });

    this.currentRoutine.actionBody = path[0];
  }

  private create() {
    this.addRoutine(
      this.currentRoutine,
    );
  }

  get actionBody() {
    let path =  this.currentRoutine.actionBody;
    if (path.length > 20) {
      path = "..." + path.substring(path.length - 19, path.length);
    }
    return path;
  }

  private deleteRoutineClick() {
    this.deleteRoutine(this.currentRoutine);
    this.drawerAction(-1);
  }

  private changeDayZones(newDayZone: number) {
    this.currentRoutine.dayZone = newDayZone;
  }

  private beforeDestroy() {
    this.saveRoutine(this.currentRoutine);
  }
}

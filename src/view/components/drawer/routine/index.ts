import Vue from "vue";
import Component from "vue-class-component";
import {State, Action} from "vuex-class";
import SliderComponent from "./slider";
import * as WithRender from "./template.html";
require("./styles.scss");

import DropdownComponent from "src/view/default-components/dropdown/dropdown";

const nothing = require("assets/do-not-disturb-rounded-sign.svg");
const file = require("assets/file.svg");
const link = require("assets/internet.svg");

const pen = require("assets/pen.svg");
import {colors} from "src/view/color.themes";
import { Routine } from "src/models/routines.routine";
import { Action as RoutineAction } from "src/models/action";

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

// FIX THERE ALL
export default class RoutineComponent extends Vue {
  @State("items", {namespace}) public routines: Routine[] = [];

  @Action("addRoutine", { namespace }) public addRoutine: any;
  @Action("deleteRoutine", { namespace }) public deleteRoutine: any;
  @Action("saveRoutine", { namespace }) public saveRoutine: any;
  @Action("closePopUp", {namespace: appNamespace}) public closePopUp: any;
  // saveRoutines

  public colors: string[] = Object.keys(colors);
  public ID: number = -1;
  public currentRoutine: Routine = {
    ID: -1, name: "",
    actionBody: "",
    actionType: RoutineAction.Link,
    colorScheme: Object.keys(colors)[0],
    describe: "", hours: 1};

  public actionBuffer: string = "";
  public nothing: string = nothing;
  public file: string = file;
  public link: string = link;
  public pen: string = pen;

  public currentColorIndex(): number {
    return Object.keys(colors).indexOf(this.currentRoutine.colorScheme);
  }

  public created() {
    if (this.$props.routineID !== -1) {
      this.routines.forEach((element: Routine) => {
        if (element.ID === this.$props.routineID) {
          this.currentRoutine = {...element};
        }
      });
    }
  }

  public colorChange(colorScheme: string) {
    this.currentRoutine.colorScheme = colorScheme;
  }

  public click(index: number) {
    if ((index === 2 || index === 1) && this.currentRoutine.actionType !== 3) {
      const l = this.currentRoutine.actionBody;
      this.currentRoutine.actionBody = this.actionBuffer;
      this.actionBuffer = l;
    }
    this.currentRoutine.actionType = index;
  }

  public sliderTriger(num: number) {
    this.currentRoutine.hours = num;
  }

  public chooseFile() {
    const path = dialog.showOpenDialog({
      properties: ["openFile"],
    });

    this.currentRoutine.actionBody = path[0];
  }

  public create() {
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

  public deleteRoutineClick() {
    this.deleteRoutine(this.currentRoutine);
    this.closePopUp();
  }

  public beforeDestroy() {
    this.saveRoutine(this.currentRoutine);
  }
}

import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import {Action} from "vuex-class";
require("./styles.scss");

const namespace: string = "settings";

const rotuineNamespace: string = "routines";
const deadZoneNamespace: string = "deadZones";
const scheduleNamespace: string = "schedule";

@WithRender
@Component({})
export default class DataComponent extends Vue {
  @Action("exportData", { namespace }) public exportData: any;
  @Action("importData", { namespace }) public importData: any;
  @Action("clearAll", {namespace}) public clearData: any;

  // Need update all data, for fast update
  @Action("loadDeadZones", { namespace: deadZoneNamespace }) public loadDeadZones: any;
  @Action("loadRoutines", { namespace: rotuineNamespace }) public loadRoutines: any;
  @Action("loadSchedule", { namespace: scheduleNamespace }) public loadSchedule: any;

  public exportClick() {
    this.exportData();
  }

  public importClick() {
    this.importData();
  }

  public beforeDestroy() {
    this.loadDeadZones();
    this.loadRoutines();
    this.loadSchedule();
  }

  public deleteClick() {
    this.clearData();
  }

}

import Vue from "vue";
import Component from "vue-class-component";
import {IDeadZone} from "src/models/dead_zone";
import {Times, TimeHalf} from "./interfaces";
import CircleComponent from "./circle";
import SwitchComponent from "./switch-time-zone";
import WeekComponent from "./week";

import * as WithRender from "./template.html";
import { Action } from "vuex-class";
require("./styles.scss");

const del = require("assets/rubbish-bin-delete-button.svg");

const namespace: string = "deadZones";
@WithRender
@Component({
  components: {
    CircleComponent,
    SwitchComponent,
    WeekComponent,
  },
  props: {
    zone: {
      type: Object as () => IDeadZone,
    },
    time: {
      type: Object as () => Times,
    },
  },
})
export default class Editor extends Vue {
  @Action("saveChangedDeadZone", { namespace }) public saveChangedDeadZone: any;
  @Action("deleteDeadZone", { namespace }) public deleteDeadZone: any;

  public startTimeZone: TimeHalf = TimeHalf.AM;
  public doneTimeZone: TimeHalf = TimeHalf.AM;
  public del: string = del;
  public deleteSwitch: boolean = false;

  public computed() {
    this.startTimeZone = this.timeHalf(this.$props.zone.start);
    this.doneTimeZone = this.timeHalf(this.$props.zone.done);
  }

  public triggeredRight(hour: number) {
    this.$props.zone.done = hour;
  }

  public trigerredLeft(hour: number) {
    this.$props.zone.start = hour;
  }

  public changeZoneStart() {
    if (this.$props.zone.start >= 12) {
      this.$props.zone.start -= 12;
      this.startTimeZone = TimeHalf.AM;
    } else {
      this.$props.zone.start += 12;
      this.startTimeZone = TimeHalf.PM;
    }
  }

  public changeZoneEnd() {
    if (this.$props.zone.done >= 12) {
      this.$props.zone.done -= 12;
      this.doneTimeZone = TimeHalf.AM;
    } else {
      this.$props.zone.done += 12;
      this.doneTimeZone = TimeHalf.PM;
    }

  }

  public timeHalf(time: number): TimeHalf {
    if (time >= 12) {
      return TimeHalf.PM;
    } else {
      return TimeHalf.AM;
    }
  }

  public deleteClick() {
    if (this.deleteSwitch) {
      this.deleteDeadZone(this.$props.zone);
      return;
    }
    this.deleteSwitch = !this.deleteSwitch;
  }

  public beforeDestroy() {
    this.saveChangedDeadZone(this.$props.zone);
    // console.log("Destroy")
  }
}

import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    disabled_days: Array,
  },
})
export default class WeekComponent extends Vue {
  public days: string[] = ["M", "T", "W", "T", "F", "S", "S"];

  public getClass(index: number): string {
    let result = "dead_zone_editor_week_day";
    if (!this.isDiactivate(index)) {
      result += " diactivate";
    }
    return result;
  }

  public click(index: number) {
    if (!this.isDiactivate(index)) {
      this.$props.disabled_days.splice(this.$props.disabled_days.indexOf(index), 1);
    } else {
      this.$props.disabled_days.push(index);
    }
  }
  // diactivate:Array<number> = [0,3]

  private isDiactivate(index: number) {
    if (this.$props.disabled_days.indexOf(index) !== -1) { return false; }
    return true;
  }

}

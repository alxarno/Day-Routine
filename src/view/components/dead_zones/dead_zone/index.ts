import Vue from "vue";
import Component from "vue-class-component";
import {Action} from "vuex-class";
import * as WithRender from "./template.html";
import CheckBox from "src/view/default-components/checkbox";
import EditorComponent from "./editor/index";
import {TimeFormat} from "./methods";
import {IDeadZone} from "src/models/dead_zone";

require("./styles.scss");

const namespace: string = "deadZones";
@WithRender
@Component({
  components: {
    CheckBox,
    EditorComponent,
  },
  props: {
    zone: {
      type: Object as () => IDeadZone,
    },
    active: Boolean,
    changeActive: Function,
    currentIndex: Number,
  },
})
export default class DeadZoneComponent extends Vue {
  @Action("saveChangedDeadZone", { namespace }) public saveChangedDeadZone: any;

  get time() {
    return TimeFormat(this.$props.zone.start, this.$props.zone.done);
  }

  public isDiactivate(index: number) {
    if (this.$props.zone.disabled_days.indexOf(index) !== -1) { return false; }
    return true;
  }

  public click() {
    this.$props.changeActive(this.$props.currentIndex);
  }

  public checkChange(value: boolean) {
    // console.log(this.$props.zone);
    this.$props.zone.enable = value;
    this.saveChangedDeadZone(this.$props.zone);
  }

  // computed(){
  //   return{
  //     formated () {
  //       let res =
  //     }
  //  }
  // }
}

import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    items: Array,
    currentItem: Number,
    callback: Function,
  },
})
export default class DropdownComponent extends Vue {
  public current: any = 0;

  public click(i: number) {
    this.current = i;
    this.$props.callback(this.$props.items[i]);
  }

  public mounted() {
    this.current = this.$props.currentItem;
  }

}

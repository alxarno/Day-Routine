import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    state: Boolean,
  },
})
export default class CheckBox extends Vue {

  // message: string = 'Hello!'
  public checked: boolean = (this as any).state;

  public onClick(): void {
    // window.alert(this.message)
    this.checked = !this.checked;
    // this.$props.callback(this.checked);
    this.$emit("callback", this.checked);
  }
}

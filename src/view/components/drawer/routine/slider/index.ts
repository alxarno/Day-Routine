import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    max: Number,
    now: Number,
  },
})
export default class SliderComponent extends Vue {

  public dragging: boolean = false;
  public x: number = 0;
  public current: number = 1;
  // MINIMAL_STEP =
  public margin: number = 0;

  public startDrag() {
    this.dragging = true;
  }

  public doDrag(event: MouseEvent) {
    if (this.dragging) {
      const avgX =  event.clientX - this.x;
      this.margin += avgX;
      // 3 is just index of speed
      const minmargin = (((this.$refs.slider_element_ref) as HTMLElement).offsetWidth / this.$props.max) - 3;
      if (this.margin >= minmargin && this.current < this.$props.max) {
        this.current++;
        this.margin = 0;
        this.$emit("trigered", this.current);
      } else if (this.margin <= -1 * minmargin && this.current > 1) {
        if (this.current === 1) { return; }
        this.current--;
        this.margin = 0;
        this.$emit("trigered", this.current);
      }
    }
    this.x = event.clientX;
  }

  public stopDrag() {
    this.dragging = false;
  }

  public mounted() {
    this.current = this.$props.now;
    document.addEventListener("mousemove", this.doDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

}

import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    max: Number,
    now: Number,
    min: Number,
  },
})
export default class SliderComponent extends Vue {
  public dragging: boolean = false;
  public current: number = 1;

  public startDrag() {
    this.dragging = true;
  }
  public doDrag(event: MouseEvent) {
    if (this.dragging) {
     this.action(event);
    }
  }

  public stopDrag() {
    this.dragging = false;
  }

  public mounted() {
    this.current = this.$props.now;
    document.addEventListener("mousemove", this.doDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

  public wrapperClick(event: MouseEvent) {
    if ((event as any).path[0].getAttribute("data-click") === "target") {
      this.action(event);
    }
  }

  private action(event: MouseEvent) {
    const el: HTMLElement = ((this.$refs.slider_element_ref) as HTMLElement);
    const elWidth: number = el.offsetWidth;
    const elLeft: number = this.getGlobalOffset(el);
    const coeff: number = (elWidth / this.$props.max) - 0.5;
    // If cursor leave slider X area
    if (event.clientX > elLeft + elWidth || event.clientX  < elLeft) {return; }
    let result: number = Math.floor((event.clientX - elLeft) / coeff);
    if (result > this.$props.max) {result = this.$props.max; }
    if (result < this.$props.min) {result = this.$props.min; }
    this.current = result;
    this.$emit("trigered", this.current);
  }

  private getGlobalOffset(el: HTMLElement) {
    let x = 0;
    while (el) {
        x += el.offsetLeft;
        el = (el.offsetParent as HTMLElement);
    }
    return x;
  }

}

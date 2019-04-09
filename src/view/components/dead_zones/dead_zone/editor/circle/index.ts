import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
require("./styles.scss");

@WithRender
@Component({
  props: {
    time: String,
    startPos: Number,
    triggered: Function,
    timeCurrent: Number,
  },
})
export default class CircleComponent extends Vue {
  public dragging: boolean = false;
  public MINIMAL_STEP = 70;
  public x: number = 0;
  public y: number = 0;
  public margin: number = 0;

  public startDrag() {
    this.dragging = true;
  }
  public stopDrag() {
    this.dragging = false;
  }
  public doDrag(event: MouseEvent) {
    if (this.dragging) {
      const avgX =  event.clientX - this.x;
      this.margin += (avgX / this.MINIMAL_STEP);
      this.$props.triggered(this.curentHourNow);
    }
    this.x = event.clientX;
    this.y = event.clientY;
  }

  get rotate() {
    return Math.floor(this.margin) * 30 - 6;
  }

  public created() {
    let  currTime = this.$props.timeCurrent;
    this.margin = this.$props.startPos;
    if (currTime >= 12) {currTime -= 12; }
    this.margin -= currTime;
  }

  get curentHourNow() {
    const start =  this.$props.startPos;
    const lastTime = this.$props.timeCurrent;
    const margin = Math.floor(this.margin);
    let newMargin = (margin - start) * -1;

    if (newMargin > 12 || newMargin < -12) {
      newMargin = newMargin % 12;
    }

    if (newMargin < 0) { newMargin = 12 + newMargin; }
    if (newMargin === 12) {newMargin = 0; }

    if (lastTime > 11) {
      newMargin += 12;
    }

    return newMargin;
  }

  public mounted() {
    document.addEventListener("mousemove", this.doDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

  public beforeDestroy() {
    // console.log("Destoyed Circle");
  }
}

import Vue from "vue";
import Component from "vue-class-component";
import {Action, State} from "vuex-class";
import * as WithRender from "./template.html";
import { colors, IColor } from "src/view/color.themes";
import { CHANGE_STATISTICS } from "src/view/store/modules/routines";
require("./styles.scss");

enum commands {
  line,
  bezier,
}

let mouseDown: number = -1;
const namespace: string = "routines";
@WithRender
@Component({
  props: {
    stat: Array,
    color: Object,
    hoursPerWeek: Number,
    routineID: Number,
  },
})
export default class RoutineStatGraphPanel extends Vue {
  @Action(CHANGE_STATISTICS, { namespace}) public changeStatistics?:
    (data: {routineID: number, spent: number[]}) => void;

  private pointsO: number[] = [0, 0, 0, 0, 0, 0, 0];

  public created() {

    this.pointsO = this.$props.stat;
    document.addEventListener("mouseup", this.upListener.bind(this));
    document.addEventListener("mousemove", this.moveListener.bind(this));
  }

  public beforeDestroy() {
    document.removeEventListener("mouseup", this.upListener.bind(this));
    document.removeEventListener("mousemove", this.moveListener.bind(this));
  }

  public upListener() {
    if (mouseDown !== -1) {
      mouseDown = -1;
    }
  }

  public moveListener(event: MouseEvent) {
    if (mouseDown !== -1) {
      const elem = this.$refs[`routine_graph_panel${this.$props.routineID}`];
      if (!elem) {return; }
      const pos = (elem as HTMLElement).getBoundingClientRect();
      let newHours = Math.round(10 - (event.clientY - pos.top) / 18);
      newHours = (newHours >= 0 ? newHours : 0);
      newHours = (newHours > 10 ? 10 : newHours);
      if (this.pointsO[mouseDown ] === newHours) {return; }
      this.pointsO = this.pointsO.map((v, i) => (i === mouseDown  ? newHours : v));
      this.changeStatistics!({routineID: this.$props.routineID, spent: this.pointsO});
    }
  }

  public onClick(): void {
    // window.alert(this.message);
  }

  public get colortheme() {
    return this.$props.color as IColor;
  }

  public get points(): number[][] {
    // Reducing numbers (8-v) because we follow a rule - (more hours - higher curve point)
    // But the zero point of coordinate is left-up corner
    const original = this.pointsO.map((v) => (v > 10 ? -2 : 8 - v));
    return original.map((value: number, index: number) => [index * 80 + 10, value * 0.1 * 160 + 45]);
  }

  public get svg() {
    return this.svgPath(this.points, this.bezier);
  }

  public get necessaryLine() {
    let need = this.$props.hoursPerWeek / 7 ;
    need = (need > 10 ? -2 : 8 - need) * 0.1 * 180 + 45;
    return `M 0,${need} L 500,${need}` ;
  }

  public get innerSvg() {
    const curve = this.svg;
    return curve + ` L 500,180 L 0,180 L 0,${this.points[0][1]}`;
  }

  private svgPath(points: number[][], command: (point: number[], i: number, a: number[][]) => void): string {
    let d = points.reduce((acc, point, i, a) => i === 0
      ? `M 0,${point[1]} L ${point[0]},${point[1]}`
      : `${acc} ${command(point, i, a)}`
    , "");
    d += ` L 500,${points[points.length - 1][1]}`;
    return d;
  }

  private line = (point: number[]) => `L ${point[0]} ${point[1]}`;

  private bezier = (point: number[], i: number, a: number[][]): string => {
    const [cpsX, cpsY] = this.controlPoint(a[i - 1], a[i - 2], point, false);

    const [cpeX, cpeY] = this.controlPoint(point, a[i - 1 ], a[i + 1], true);

    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
  }

  private lineForBezie = (pointA: number[], pointB: number[]): {length: number, angle: number} => {
    const lX = pointB[0] - pointA[0];
    const lY = pointB[1] - pointA[1];

    return {
      length: Math.sqrt(Math.pow(lX, 2) + Math.pow(lY, 2)),
      angle: Math.atan2(lY, lX),
    };
  }

  private controlPoint = (curr: number[], prev: number[], next: number[], reverse: boolean): number[] => {
    const p: number[] = prev || curr;
    const n: number[] = next || curr;

    const smothing = 0.2;

    const o = this.lineForBezie(p, n);

    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smothing;

    const x = curr[0] + Math.cos(angle) * length;
    const y = curr[1] + Math.sin(angle) * length;

    return [x, y];
  }

  private mousedown = (event: MouseEvent, index: number) => {
    mouseDown = index;
  }

}

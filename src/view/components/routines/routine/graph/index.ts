import Vue from "vue";
import Component from "vue-class-component";
import * as WithRender from "./template.html";
import { colors, IColor } from "src/view/color.themes";
require("./styles.scss");

enum commands {
  line,
  bezier,
}

@WithRender
@Component({
  props: {
    stat: Array,
    color: Object,
  },
})
export default class RoutineStatGraph extends Vue {
  // private color: IColor = ;

  public onClick(): void {
    // window.alert(this.message);
  }

  public get colortheme() {
    return this.$props.color as IColor;
  }

  public get svg() {
    let original: number[] = this.$props.stat;
    // Reducing numbers (8-v) because we follow a rule - (more hours - higher curve point)
    // But the zero point of coordinate is left-up corner
    original = original.map((v) => (v > 10 ? 0 : 8 - v));
    const points: number[][] = original.map((value: number, index: number) => [index * 4 + 1, value * 2 + 1]);

    return this.svgPath(points, this.bezier);
  }

  private svgPath(points: number[][], command: (point: number[], i: number, a: number[][]) => void): string {
    const d = points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${command(point, i, a)}`
    , "");
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

}

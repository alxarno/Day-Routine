var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './circle.html';
require('./circle.scss');
let CircleComponent = class CircleComponent extends Vue {
    constructor() {
        super(...arguments);
        this.dragging = false;
        this.MINIMAL_STEP = 70;
        this.x = 0;
        this.y = 0;
        this.margin = 0;
    }
    // currentHour: number = 0
    startDrag() {
        this.dragging = true;
    }
    stopDrag() {
        this.dragging = false;
    }
    doDrag(event) {
        // console.log("Drag")
        if (this.dragging) {
            let avgX = event.clientX - this.x;
            this.margin += (avgX / this.MINIMAL_STEP);
            this.$props.triggered(this.curentHourNow);
        }
        this.x = event.clientX;
        this.y = event.clientY;
    }
    get rotate() {
        return Math.floor(this.margin) * 30 - 6;
    }
    created() {
        let currTime = this.$props.timeCurrent;
        this.margin = this.$props.startPos;
        if (currTime >= 12) {
            currTime -= 12;
        }
        this.margin -= currTime;
    }
    get curentHourNow() {
        let start = this.$props.startPos;
        let lastTime = this.$props.timeCurrent;
        let margin = Math.floor(this.margin);
        let newMargin = (margin - start) * -1;
        if (newMargin > 12 || newMargin < -12) {
            newMargin = newMargin % 12;
        }
        if (newMargin < 0)
            newMargin = 12 + newMargin;
        if (newMargin == 12)
            newMargin = 0;
        if (lastTime > 11) {
            newMargin += 12;
        }
        return newMargin;
    }
    mounted() {
        document.addEventListener("mousemove", this.doDrag);
        window.addEventListener('mouseup', this.stopDrag);
    }
    beforeDestroy() {
        console.log("Destoyed Circle");
    }
};
CircleComponent = __decorate([
    WithRender,
    Component({
        props: {
            time: String,
            startPos: Number,
            triggered: Function,
            timeCurrent: Number
        }
    })
], CircleComponent);
export default CircleComponent;
//# sourceMappingURL=circle.js.map
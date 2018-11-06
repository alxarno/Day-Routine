var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './slider.html';
require('./slider.scss');
let SliderComponent = class SliderComponent extends Vue {
    constructor() {
        super(...arguments);
        this.dragging = false;
        this.x = 0;
        this.current = 1;
        // MINIMAL_STEP = 
        this.margin = 0;
    }
    startDrag() {
        this.dragging = true;
    }
    doDrag(event) {
        if (this.dragging) {
            let avgX = event.clientX - this.x;
            this.margin += avgX;
            // 3 is just index of speed
            let minmargin = ((this.$refs.slider_element_ref).offsetWidth / this.$props.max) - 3;
            if (this.margin >= minmargin && this.current < this.$props.max) {
                this.current++;
                this.margin = 0;
                this.$props.triggered(this.current);
            }
            else if (this.margin <= -1 * minmargin && this.current > 1) {
                if (this.current == 1)
                    return;
                this.current--;
                this.margin = 0;
                this.$props.triggered(this.current);
            }
        }
        this.x = event.clientX;
    }
    stopDrag() {
        this.dragging = false;
    }
    mounted() {
        this.current = this.$props.now;
        document.addEventListener("mousemove", this.doDrag);
        window.addEventListener('mouseup', this.stopDrag);
    }
};
SliderComponent = __decorate([
    WithRender,
    Component({
        props: {
            max: Number,
            now: Number,
            triggered: Function
        }
    })
], SliderComponent);
export default SliderComponent;
//# sourceMappingURL=slider.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { colors } from 'src/view/color.themes';
import { CheckCurrentTask, ComputeWrapperStyle, ShortDescribe, StartAndDone } from './task.methods';
import * as WithRender from './task.html';
require('./task.scss');
let Task = class Task extends Vue {
    constructor() {
        super(...arguments);
        this.activeTask = 9;
        this.curentColor = colors.default;
        this.describe = "";
        this.taskStart = "00:00";
        this.taskDone = "00:00";
        this.wrapperStyle = {
            borderLeft: '3px solid ',
            height: '94px',
            background: "#ffffff",
            "--box-shadow-color": "#ffffff"
        };
        this.currentActiveTask = false;
    }
    created() {
        if (this.$props.task) {
            // Change color scheme and style
            this.currentActiveTask = CheckCurrentTask(this.$props.task.start, this.$props.task.hours);
            if (colors.hasOwnProperty(this.$props.task.color)) {
                this.curentColor = colors[this.$props.task.color];
                this.wrapperStyle = ComputeWrapperStyle(this.curentColor, this.$props.task.hours, this.currentActiveTask, this.wrapperStyle);
            }
            // Short describe
            this.describe = ShortDescribe(this.$props.task.describe, this.$props.task.hours);
            // Calculate start and done time
            let times = StartAndDone(this.$props.task.start, this.$props.task.hours);
            this.taskStart = times.taskStart;
            this.taskDone = times.taskDone;
        }
    }
    mounted() {
        // console.log(this.$props.task)
    }
};
Task = __decorate([
    WithRender,
    Component({
        props: {
            task: {
                type: Object
            }
        }
    })
], Task);
export default Task;
//# sourceMappingURL=task.js.map
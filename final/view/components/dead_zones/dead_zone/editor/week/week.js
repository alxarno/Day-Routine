var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './week.html';
require('./week.scss');
let WeekComponent = class WeekComponent extends Vue {
    constructor() {
        super(...arguments);
        this.days = ["M", "T", "W", "T", "F", "S", "S"];
    }
    // diactivate:Array<number> = [0,3]
    isDiactivate(index) {
        if (this.$props.disabled_days.indexOf(index) != -1)
            return false;
        return true;
    }
    getClass(index) {
        let result = 'dead_zone_editor_week_day';
        if (!this.isDiactivate(index)) {
            result += " diactivate";
        }
        return result;
    }
    click(index) {
        if (!this.isDiactivate(index)) {
            this.$props.disabled_days.splice(this.$props.disabled_days.indexOf(index), 1);
        }
        else {
            this.$props.disabled_days.push(index);
        }
    }
};
WeekComponent = __decorate([
    WithRender,
    Component({
        props: {
            disabled_days: Array
        }
    })
], WeekComponent);
export default WeekComponent;
//# sourceMappingURL=week.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { TimeHalf } from './interfaces';
import CircleComponent from './circle/circle';
import SwitchComponent from './switch-time-zone/switch';
import WeekComponent from './week/week';
import * as WithRender from './editor.html';
import { Action } from 'vuex-class';
require('./editor.scss');
const del = require('assets/rubbish-bin-delete-button.svg');
const namespace = "deadZones";
let Editor = class Editor extends Vue {
    constructor() {
        super(...arguments);
        this.startTimeZone = TimeHalf.AM;
        this.doneTimeZone = TimeHalf.AM;
        this.del = del;
        this.deleteSwitch = false;
    }
    computed() {
        this.startTimeZone = this.timeHalf(this.$props.zone.start);
        this.doneTimeZone = this.timeHalf(this.$props.zone.done);
    }
    triggeredRight(hour) {
        if (this.doneTimeZone == TimeHalf.PM) {
            hour += 12;
        }
        this.$props.zone.done = hour;
    }
    trigerredLeft(hour) {
        if (this.startTimeZone == TimeHalf.PM) {
            hour += 12;
        }
        this.$props.zone.start = hour;
    }
    changeZoneStart() {
        if (this.$props.zone.start >= 12) {
            this.$props.zone.start -= 12;
            this.startTimeZone = TimeHalf.AM;
        }
        else {
            this.$props.zone.start += 12;
            this.startTimeZone = TimeHalf.PM;
        }
    }
    changeZoneEnd() {
        if (this.$props.zone.done >= 12) {
            this.$props.zone.done -= 12;
            this.doneTimeZone = TimeHalf.AM;
        }
        else {
            this.$props.zone.done += 12;
            this.doneTimeZone = TimeHalf.PM;
        }
    }
    timeHalf(time) {
        if (time >= 12) {
            return TimeHalf.PM;
        }
        else {
            return TimeHalf.AM;
        }
    }
    deleteClick() {
        if (this.deleteSwitch) {
            this.deleteDeadZone(this.$props.zone);
            return;
        }
        this.deleteSwitch = !this.deleteSwitch;
    }
    beforeDestroy() {
        this.saveChangedDeadZone(this.$props.zone);
        // console.log("Destroy")
    }
};
__decorate([
    Action('saveChangedDeadZone', { namespace })
], Editor.prototype, "saveChangedDeadZone", void 0);
__decorate([
    Action('deleteDeadZone', { namespace })
], Editor.prototype, "deleteDeadZone", void 0);
Editor = __decorate([
    WithRender,
    Component({
        components: {
            CircleComponent,
            SwitchComponent,
            WeekComponent
        },
        props: {
            zone: {
                type: Object
            },
            time: {
                type: Object
            }
        }
    })
], Editor);
export default Editor;
//# sourceMappingURL=editor.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import TaskComponent from './task/task';
import * as WithRender from './now.html';
import { GetTimes, GetScrollTop, GetCurrentTime, GetCurrentTimeMarginTop } from './now-methods';
require('./now.scss');
const namespace = 'schedule';
let NowComponent = class NowComponent extends Vue {
    constructor() {
        super(...arguments);
        this.time = GetTimes();
        this.currentTime = GetCurrentTime();
        this.currentTimeMarginTop = GetCurrentTimeMarginTop();
    }
    mounted() {
        this.loadSchedule();
        var elem = this.$refs.now__body;
        elem.scrollTop = GetScrollTop();
    }
};
__decorate([
    State(state => state.schedule.items)
], NowComponent.prototype, "tasks", void 0);
__decorate([
    Action('loadSchedule', { namespace })
], NowComponent.prototype, "loadSchedule", void 0);
NowComponent = __decorate([
    WithRender,
    Component({
        components: { TaskComponent }
    })
], NowComponent);
export default NowComponent;
//# sourceMappingURL=now.js.map
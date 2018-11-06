var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as WithRender from './dead_zones.html';
import DeadZoneComponent from './dead_zone/dead_zone';
import NewButton from 'src/view/default-components/new_button/new_button';
require('./dead_zones.scss');
const searchIcon = require("assets/search.svg");
const namespace = "deadZones";
let DeadZones = class DeadZones extends Vue {
    constructor() {
        super(...arguments);
        this.searchIcon = searchIcon;
        this.searchRequest = "";
    }
    mounted() {
        this.loadDeadZones();
    }
    change(index) {
        if (index == this.currentItem) {
            this.setCurrentItem(-1);
        }
        else {
            this.setCurrentItem(index);
        }
    }
    newDeadZoneHandler() {
        this.newDeadZone();
    }
};
__decorate([
    State("items", { namespace })
], DeadZones.prototype, "deadZonesItems", void 0);
__decorate([
    State("currentItem", { namespace })
], DeadZones.prototype, "currentItem", void 0);
__decorate([
    Action('setCurrentItem', { namespace })
], DeadZones.prototype, "setCurrentItem", void 0);
__decorate([
    Action('loadDeadZones', { namespace })
], DeadZones.prototype, "loadDeadZones", void 0);
__decorate([
    Action('newDeadZone', { namespace })
], DeadZones.prototype, "newDeadZone", void 0);
DeadZones = __decorate([
    WithRender,
    Component({
        components: {
            DeadZoneComponent,
            NewButton
        }
    })
], DeadZones);
export default DeadZones;
//# sourceMappingURL=dead_zones.js.map
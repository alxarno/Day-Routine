var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './dead_zone.html';
import CheckBox from 'src/view/default-components/checkbox/checkbox';
import EditorComponent from './editor/editor';
import { TimeFormat } from './dead_zone.methods';
import { Action } from 'vuex-class';
require('./dead_zone.scss');
const namespace = "deadZones";
let DeadZoneComponent = class DeadZoneComponent extends Vue {
    get time() {
        return TimeFormat(this.$props.zone.start, this.$props.zone.done);
    }
    isDiactivate(index) {
        if (this.$props.zone.disabled_days.indexOf(index) != -1)
            return false;
        return true;
    }
    click() {
        this.$props.changeActive(this.$props.currentIndex);
    }
    checkChange(value) {
        // console.log(value)
        this.$props.zone.enable = value;
        this.saveChangedDeadZone(this.$props.zone);
    }
};
__decorate([
    Action('saveChangedDeadZone', { namespace })
], DeadZoneComponent.prototype, "saveChangedDeadZone", void 0);
DeadZoneComponent = __decorate([
    WithRender,
    Component({
        components: {
            CheckBox,
            EditorComponent
        },
        props: {
            zone: {
                type: Object
            },
            active: Boolean,
            changeActive: Function,
            currentIndex: Number
        }
    })
], DeadZoneComponent);
export default DeadZoneComponent;
//# sourceMappingURL=dead_zone.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { colors } from 'src/view/color.themes';
import * as WithRender from './routine.html';
import { Action } from 'vuex-class';
const icon = require("assets/controls.svg");
require('./routine.scss');
const namespace = "routines";
let RoutineComponent = class RoutineComponent extends Vue {
    constructor() {
        super(...arguments);
        // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;
        // @Action('loadRoutines', { namespace }) loadRoutines: any;
        this.curentColor = colors.default;
        this.settingsIcon = icon;
    }
    created() {
        if (colors.hasOwnProperty(this.$props.routine.colorScheme))
            this.curentColor = colors[this.$props.routine.colorScheme];
    }
    settings() {
        this.openRoutineSettings(this.$props.routine.ID);
        // this.$store.dispatch("openPopUp")
        // this.$store.dispatch("currentRoutineChange", {number: this.$props.routine.id})
        // this.$store.dispatch('routineSettingsWindow')
    }
};
__decorate([
    Action('openRoutineSettings', { namespace })
], RoutineComponent.prototype, "openRoutineSettings", void 0);
RoutineComponent = __decorate([
    WithRender,
    Component({
        props: {
            routine: {
                type: Object
            }
        }
    })
], RoutineComponent);
export default RoutineComponent;
//# sourceMappingURL=routine.js.map
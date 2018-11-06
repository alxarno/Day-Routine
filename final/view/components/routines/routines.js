var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
import RoutineComponent from './routine/routine';
import * as WithRender from './routines.html';
import NewButton from 'src/view/default-components/new_button/new_button';
require("./routines.scss");
const searchIcon = require("assets/search.svg");
const addIcon = require("assets/add.svg");
const namespace = 'routines';
let RoutinesComponent = class RoutinesComponent extends Vue {
    constructor() {
        super(...arguments);
        this.searchRequest = "";
        this.searchIcon = searchIcon;
        this.addIcon = addIcon;
    }
    mounted() {
        this.loadRoutines();
    }
    newRoutine() {
        this.newRoutineWindow();
    }
    closeSettings() {
        this.routineSettingsWindow();
    }
};
__decorate([
    State(state => state.routines.items)
], RoutinesComponent.prototype, "routines", void 0);
__decorate([
    State(state => state.routines.loaded)
], RoutinesComponent.prototype, "loaded", void 0);
__decorate([
    Action('newRoutineWindow', { namespace })
], RoutinesComponent.prototype, "newRoutineWindow", void 0);
__decorate([
    Action('routineSettingsWindow', { namespace })
], RoutinesComponent.prototype, "routineSettingsWindow", void 0);
__decorate([
    Action('loadRoutines', { namespace })
], RoutinesComponent.prototype, "loadRoutines", void 0);
RoutinesComponent = __decorate([
    WithRender,
    Component({
        components: {
            RoutineComponent,
            NewButton
        }
    })
], RoutinesComponent);
export default RoutinesComponent;
//# sourceMappingURL=routines.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import HeaderComponent from "./header/header";
import NowComponent from "./now/now";
import RoutinesComponent from "./routines/routines";
import DeadZonesComponent from "./dead_zones/dead_zones";
import ModalsComponent from './modals/modals';
import * as WithRender from './main.html';
const namespace = 'app';
let MainComponent = class MainComponent extends Vue {
    constructor() {
        super(...arguments);
        this.style = {
            filter: "blur(5px)"
        };
        // @Action('newRoutineWindow', { namespace }) newRoutineWindow: any;
        // @Action('routineSettingsWindow', { namespace }) routineSettingsWindow: any;
    }
};
__decorate([
    State('menu_active_item', { namespace })
], MainComponent.prototype, "menuActiveItem", void 0);
__decorate([
    State('popup_open', { namespace })
], MainComponent.prototype, "popup_open", void 0);
MainComponent = __decorate([
    WithRender,
    Component({
        components: {
            HeaderComponent,
            NowComponent,
            RoutinesComponent,
            ModalsComponent,
            DeadZonesComponent
        }
    })
], MainComponent);
export default MainComponent;
//# sourceMappingURL=main.js.map
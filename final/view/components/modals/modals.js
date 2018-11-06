var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './modals.html';
import CloseButton from './elements/close/close';
import SettingsComponent from './settings/settings';
import RoutineComponent from './routine/routine';
import { State, Action } from 'vuex-class';
require("./modals.scss");
const routineNamespace = "routines";
const appNamespace = "app";
let default_1 = class default_1 extends Vue {
    close() {
        this.closePopUp();
    }
};
__decorate([
    State("routine_settings_open", { namespace: routineNamespace })
], default_1.prototype, "routineSettingsOpen", void 0);
__decorate([
    State("current_routine", { namespace: routineNamespace })
], default_1.prototype, "currentRoutine", void 0);
__decorate([
    State("new_routine_open", { namespace: routineNamespace })
], default_1.prototype, "newRoutineOpen", void 0);
__decorate([
    Action("closePopUp", { namespace: appNamespace })
], default_1.prototype, "closePopUp", void 0);
__decorate([
    State("settings_open", { namespace: appNamespace })
], default_1.prototype, "settingsOpen", void 0);
__decorate([
    State("popup_open", { namespace: appNamespace })
], default_1.prototype, "popupOpen", void 0);
default_1 = __decorate([
    WithRender,
    Component({
        components: {
            SettingsComponent,
            RoutineComponent,
            CloseButton
        }
    })
], default_1);
export default default_1;
//# sourceMappingURL=modals.js.map
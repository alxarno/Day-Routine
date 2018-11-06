var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './settings-icon.html';
import { Action } from 'vuex-class';
require("./settings-icon.scss");
const icon = require("assets/settings.svg");
const namespace = "app";
let SettingsIcon = class SettingsIcon extends Vue {
    constructor() {
        super(...arguments);
        this.icon = icon;
    }
    change() {
        this.settingsOpen();
        // this.$store.dispatch("openPopUp")
        // this.$store.dispatch('settingsOpenChange')
    }
};
__decorate([
    Action('settingsOpenChange', { namespace })
], SettingsIcon.prototype, "settingsOpen", void 0);
SettingsIcon = __decorate([
    WithRender,
    Component({})
], SettingsIcon);
export default SettingsIcon;
//# sourceMappingURL=settings-icon.js.map
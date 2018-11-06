var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './close.html';
import { Action } from 'vuex-class';
const icon = require("assets/close.svg");
require('./close.scss');
const namespace = "app";
let CloseButton = class CloseButton extends Vue {
    constructor() {
        super(...arguments);
        this.icon = icon;
    }
    click() {
        this.closePopUp();
        // this.$store.dispatch("closePopUp")
    }
};
__decorate([
    Action('closePopUp', { namespace })
], CloseButton.prototype, "closePopUp", void 0);
CloseButton = __decorate([
    WithRender,
    Component({})
], CloseButton);
export default CloseButton;
//# sourceMappingURL=close.js.map
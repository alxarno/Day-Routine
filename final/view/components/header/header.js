var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import SettingsComponent from './settings-icon/settings-icon';
import { Action, State } from 'vuex-class';
import * as WithRender from './header.html';
import menu from 'src/view/components/cons';
require("./header.scss");
const namespace = "app";
let Header = class Header extends Vue {
    constructor() {
        super(...arguments);
        this.menu = menu;
    }
    change(number) {
        this.setMenuItem(number);
    }
};
__decorate([
    Action('setMenuItem', { namespace })
], Header.prototype, "setMenuItem", void 0);
__decorate([
    State('menu_active_item', { namespace })
], Header.prototype, "menuActiveItem", void 0);
Header = __decorate([
    WithRender,
    Component({
        components: { SettingsComponent }
    })
], Header);
export default Header;
//# sourceMappingURL=header.js.map
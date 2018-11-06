var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './menu.html';
import { mapGetters } from 'vuex';
require('./menu.scss');
let Menu = class Menu extends Vue {
    constructor() {
        super(...arguments);
        this.names = ["Data"];
        this.computed = Object.assign({}, mapGetters({
            activeItem: 'menu_active_item'
        }));
    }
    get menuActiveItem() {
        return this.$store.state.settings.menu_active_item;
    }
    click(index) {
        console.log(index);
        this.$store.dispatch('setSettingsMenuItem', { number: index });
    }
};
Menu = __decorate([
    WithRender,
    Component({})
], Menu);
export default Menu;
//# sourceMappingURL=menu.js.map
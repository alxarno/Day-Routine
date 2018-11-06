var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './dropdown.html';
require("./dropdown.scss");
let DropdownComponent = class DropdownComponent extends Vue {
    constructor() {
        super(...arguments);
        this.current = 0;
    }
    click(i) {
        this.current = i;
        this.$props.callback(this.$props.items[i]);
    }
    mounted() {
        this.current = this.$props.currentItem;
    }
};
DropdownComponent = __decorate([
    WithRender,
    Component({
        props: {
            items: Array,
            currentItem: Number,
            callback: Function
        }
    })
], DropdownComponent);
export default DropdownComponent;
//# sourceMappingURL=dropdown.js.map
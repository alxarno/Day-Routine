var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './checkbox.html';
require('./checkbox.scss');
let CheckBox = class CheckBox extends Vue {
    constructor() {
        super(...arguments);
        // message: string = 'Hello!'
        this.checked = this.state;
    }
    onClick() {
        // window.alert(this.message)
        this.checked = !this.checked;
        this.$props.callback(this.checked);
    }
};
CheckBox = __decorate([
    WithRender,
    Component({
        props: {
            callback: Function,
            state: Boolean
        }
    })
], CheckBox);
export default CheckBox;
//# sourceMappingURL=checkbox.js.map
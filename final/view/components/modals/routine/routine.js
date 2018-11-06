var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import SliderComponent from './slider/slider';
import * as WithRender from './routine.html';
require('./routine.scss');
import DropdownComponent from 'src/view/default-components/dropdown/dropdown';
const nothing = require('assets/do-not-disturb-rounded-sign.svg');
const file = require('assets/file.svg');
const link = require('assets/internet.svg');
const pen = require('assets/pen.svg');
import { colors } from 'src/view/color.themes';
import { Action as RoutineAction } from 'src/models/action';
const { dialog } = window.require('electron').remote;
const namespace = "routines";
const appNamespace = "app";
let RoutineComponent = 
// FIX THERE ALL
class RoutineComponent extends Vue {
    constructor() {
        super(...arguments);
        // saveRoutines
        this.colors = Object.keys(colors);
        this.ID = -1;
        this.currentRoutine = {
            ID: -1, name: "",
            actionBody: "",
            actionType: RoutineAction.Link,
            colorScheme: Object.keys(colors)[0],
            describe: "", hours: 1
        };
        this.actionBuffer = "";
        this.nothing = nothing;
        this.file = file;
        this.link = link;
        this.pen = pen;
    }
    currentColorIndex() {
        return Object.keys(colors).indexOf(this.currentRoutine.colorScheme);
    }
    created() {
        if (this.$props.routineID != -1) {
            this.routines.forEach((element) => {
                if (element.ID == this.$props.routineID) {
                    this.currentRoutine = Object.assign({}, element);
                }
            });
        }
    }
    colorChange(colorScheme) {
        this.currentRoutine.colorScheme = colorScheme;
    }
    click(index) {
        if ((index == 2 || index == 1) && this.currentRoutine.actionType != 3) {
            let l = this.currentRoutine.actionBody;
            this.currentRoutine.actionBody = this.actionBuffer;
            this.actionBuffer = l;
        }
        this.currentRoutine.actionType = index;
    }
    sliderTriger(num) {
        this.currentRoutine.hours = num;
    }
    chooseFile() {
        let path = dialog.showOpenDialog({
            properties: ['openFile']
        });
        this.currentRoutine.actionBody = path[0];
    }
    create() {
        this.addRoutine(this.currentRoutine);
    }
    get actionBody() {
        let path = this.currentRoutine.actionBody;
        if (path.length > 20) {
            path = "..." + path.substring(path.length - 19, path.length);
        }
        return path;
    }
    deleteRoutineClick() {
        this.deleteRoutine(this.currentRoutine);
        this.closePopUp();
    }
    beforeDestroy() {
        this.saveRoutine(this.currentRoutine);
    }
};
__decorate([
    State("items", { namespace })
], RoutineComponent.prototype, "routines", void 0);
__decorate([
    Action('addRoutine', { namespace })
], RoutineComponent.prototype, "addRoutine", void 0);
__decorate([
    Action('deleteRoutine', { namespace })
], RoutineComponent.prototype, "deleteRoutine", void 0);
__decorate([
    Action('saveRoutine', { namespace })
], RoutineComponent.prototype, "saveRoutine", void 0);
__decorate([
    Action("closePopUp", { namespace: appNamespace })
], RoutineComponent.prototype, "closePopUp", void 0);
RoutineComponent = __decorate([
    WithRender,
    Component({
        props: {
            routineID: Number
        },
        components: {
            SliderComponent,
            DropdownComponent
        }
    })
    // FIX THERE ALL
], RoutineComponent);
export default RoutineComponent;
//# sourceMappingURL=routine.js.map
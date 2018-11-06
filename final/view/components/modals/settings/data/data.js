var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import Component from 'vue-class-component';
import * as WithRender from './data.html';
import { Action } from 'vuex-class';
require('./data.scss');
const namespace = "settings";
const rotuineNamespace = "routines";
const deadZoneNamespace = "deadZones";
const scheduleNamespace = 'schedule';
let DataComponent = class DataComponent extends Vue {
    exportClick() {
        this.exportData();
    }
    importClick() {
        this.importData();
    }
    beforeDestroy() {
        this.loadDeadZones();
        this.loadRoutines();
        this.loadSchedule();
    }
    deleteClick() {
        this.clearData();
    }
};
__decorate([
    Action('exportData', { namespace })
], DataComponent.prototype, "exportData", void 0);
__decorate([
    Action('importData', { namespace })
], DataComponent.prototype, "importData", void 0);
__decorate([
    Action('clearAll', { namespace })
], DataComponent.prototype, "clearData", void 0);
__decorate([
    Action('loadDeadZones', { namespace: deadZoneNamespace })
], DataComponent.prototype, "loadDeadZones", void 0);
__decorate([
    Action('loadRoutines', { namespace: rotuineNamespace })
], DataComponent.prototype, "loadRoutines", void 0);
__decorate([
    Action('loadSchedule', { namespace: scheduleNamespace })
], DataComponent.prototype, "loadSchedule", void 0);
DataComponent = __decorate([
    WithRender,
    Component({})
], DataComponent);
export default DataComponent;
//# sourceMappingURL=data.js.map
import { RoutinesSchema, DeadZoneSchema, StatisticsSchema } from './schemas';
import { Routines } from './modules/routines';
import { DeadZones } from './modules/dead_zones';
import { Statistics } from './modules/statistics';
export class Storage {
    constructor(kernel, changeCallback) {
        this.kernel = kernel;
        this.changeCallback = changeCallback;
        this.statistics = new Statistics(this.kernel, StatisticsSchema, this.changeCallback);
        this.routines = new Routines(this.kernel, RoutinesSchema, this.statistics.Add.bind(this.statistics), this.statistics.Delete.bind(this.statistics), this.changeCallback);
        this.deadZones = new DeadZones(this.kernel, DeadZoneSchema, this.changeCallback);
    }
    Statistics() {
        return this.statistics;
    }
    Routines() {
        return this.routines;
    }
    DeadZones() {
        return this.deadZones;
    }
}
//# sourceMappingURL=index.js.map
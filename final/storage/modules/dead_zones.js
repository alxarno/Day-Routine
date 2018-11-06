var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StorageModule from './module';
export class DeadZones extends StorageModule {
    constructor(kernel, schema, changeCallback) {
        super(kernel, schema, changeCallback);
    }
    Get() {
        return __awaiter(this, void 0, void 0, function* () {
            let rows = yield this.kernel.Table().GetByName(this.schema.name).Get();
            if (Object.keys(rows).length == 0)
                return [];
            let crows = Object.keys(rows).map((v, i) => rows[i]);
            let units = crows.map((el) => this.schema.Deserialization(el));
            return units;
        });
    }
    Create(unit) {
        let dunit = this.schema.Serialization(unit);
        this.kernel.Table().GetByName(this.schema.name).Insert(dunit);
        this.changeCallback();
    }
    Delete(unit) {
        // We don't use serialization cause serialization
        // doesn't process ID , but we need ID for delete
        // certain row
        this.kernel.Table().GetByName(this.schema.name).Delete(unit);
        this.changeCallback();
    }
    Update(unit) {
        this.kernel.Table().GetByName(this.schema.name).
            Update(this.schema.Serialization(unit));
        this.changeCallback();
    }
}
//# sourceMappingURL=dead_zones.js.map
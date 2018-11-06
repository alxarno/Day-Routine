var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StorageModule from './module';
export class Routines extends StorageModule {
    constructor(kernel, schema, addToStatics, deleteFromStatics, changeCallback) {
        super(kernel, schema, changeCallback);
        this.addToStatics = addToStatics;
        this.deleteFromStatics = deleteFromStatics;
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
        return __awaiter(this, void 0, void 0, function* () {
            let dunit = this.schema.Serialization(unit);
            let id = yield this.kernel.Table().GetByName(this.schema.name).Insert(dunit);
            yield this.addToStatics({ routineID: id, hours: 0 });
            this.changeCallback();
        });
    }
    Delete(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            // let rows:{[key:number]:any} = await this.kernel.Table().GetByName(this.schema.name).Get(unit)
            // if(Object.keys(rows).length==0) return;
            // console.log(rows)
            // We don't use serialization cause serialization
            // doesn't process ID , but we need ID for delete
            // certain row
            this.deleteFromStatics(unit);
            this.kernel.Table().GetByName(this.schema.name).Delete(unit);
            this.changeCallback();
        });
    }
    Update(unit) {
        this.kernel.Table().GetByName(this.schema.name).Update(unit);
        this.changeCallback();
    }
}
//# sourceMappingURL=routines.js.map
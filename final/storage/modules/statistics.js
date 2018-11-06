var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StorageModule from './module';
export class Statistics extends StorageModule {
    constructor(kernel, schema, changeCallback) {
        super(kernel, schema, changeCallback);
    }
    clearSpoiled(st) {
        let now = new Date;
        let daysGone = Math.round((now.getTime() - st.lastUpdate.getTime()) / (1000 * 60 * 60 * 24)); //Days delta
        st.spent = [...st.spent.slice(daysGone), ...Array.from({ length: daysGone }, () => 0)]; // New n values 
        return st;
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
    Add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let st;
            let rows;
            // console.log(rows)
            rows = yield this.kernel.Table().GetByName(this.schema.name).Get({ routineID: data.routineID });
            if (Object.keys(rows).length == 0) {
                st = {
                    ID: -1,
                    routineID: data.routineID,
                    lastUpdate: new Date(),
                    spent: [0, 0, 0, 0, 0, 0, 0]
                };
            }
            else {
                let crows = Object.keys(rows).map((v, i) => rows[i]);
                let units = crows.map((el) => this.schema.Deserialization(el));
                st = units[0];
            }
            this.clearSpoiled(st);
            st.spent[6] += data.hours;
            if (st.ID == -1) {
                this.kernel.Table().GetByName(this.schema.name).Insert(this.schema.Serialization(st));
                return;
            }
            this.kernel.Table().GetByName(this.schema.name).Update(this.schema.Serialization(st));
        });
    }
    Delete(data) {
        this.kernel.Table().GetByName(this.schema.name).Delete(data);
    }
}
//# sourceMappingURL=statistics.js.map
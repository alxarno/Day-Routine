var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Crud } from './CRUD';
import { Request } from './lib';
export class Table {
    constructor(DBConnection, debug) {
        this.DB = DBConnection;
        this.debug = debug;
    }
    DecodeTableSchema(schema) {
        let rowSQL = "ID INTEGER PRIMARY KEY ASC, ";
        for (let field in schema) {
            switch (schema[field]) {
                case String:
                    rowSQL += field + " TEXT, ";
                    break;
                case Number:
                    if (field == "ID") {
                        // Already defined
                        break;
                    }
                    rowSQL += field + " INTEGER, ";
                    break;
                case Boolean:
                    rowSQL += field + " INTEGER, ";
                    break;
                case Date:
                    rowSQL += field + " INTEGER, ";
                    break;
                default:
                    throw "Failed decode schema. Type of " + field + " is wrong";
            }
        }
        // Cut last comma and space
        rowSQL = rowSQL.substring(0, rowSQL.length - 2);
        return rowSQL;
    }
    Create(name, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlBody = this.DecodeTableSchema(schema);
            sqlBody = "CREATE TABLE IF NOT EXISTS " + name + "(" + sqlBody + ")";
            // console.log(sqlBody)
            let promise = Request(sqlBody, [], this.DB);
            yield promise;
            return new Crud(name, this.DB, this.debug);
        });
    }
    Drop(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlBody = "DROP TABLE " + name;
            let promise = Request(sqlBody, [], this.DB);
            yield promise;
        });
    }
    GetByName(name) {
        return new Crud(name, this.DB, this.debug);
    }
}
//# sourceMappingURL=tables.js.map
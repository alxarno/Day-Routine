var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Request } from './lib';
export class Crud {
    constructor(tableName, DBConnection, debug) {
        this.tableName = tableName;
        this.DB = DBConnection;
        this.debug = debug;
    }
    getFields(data) {
        let fields = [];
        for (let field in data) {
            fields.push(field);
        }
        return fields;
    }
    Get() {
        return __awaiter(this, arguments, void 0, function* () {
            let arg = { ID: -1 };
            for (var i = 0; i < arguments.length; i++) {
                arg = arguments[i];
            }
            let requestString = "";
            let requestData = [];
            if (arg.ID != -1) {
                let fields = this.getFields(arg);
                let valueTemplates = fields.map((val) => { return val + " = ?"; });
                let valuesTemplatesString = valueTemplates.join(" AND ");
                requestData = fields.map((val) => arg[val]);
                requestString = "SELECT * FROM " + this.tableName + " WHERE " + valuesTemplatesString;
            }
            else {
                requestString = "SELECT * FROM " + this.tableName;
            }
            if (this.debug) {
                console.log("===================");
                console.log(requestString);
                console.log("===================");
            }
            let promise = Request(requestString, requestData, this.DB);
            let data = yield promise;
            return data.rows;
        });
    }
    Insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let fields = this.getFields(data);
            fields.splice(fields.indexOf("ID"), 1);
            let values = fields.map((val) => data[val]);
            let questionMarks = fields.map(() => '?');
            let querryString = `INSERT INTO ` + this.tableName +
                ` (` + fields.toString() + `) VALUES (` + questionMarks.toString() + `)`;
            if (this.debug) {
                console.log("++++++++++++++++++");
                console.log(querryString);
                console.log("++++++++++++++++++");
            }
            let promise = Request(querryString, values, this.DB);
            let somedata = yield promise;
            return somedata.insertId;
        });
    }
    Update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.hasOwnProperty('ID')) {
                throw "Argument haven't ID property";
            }
            let fields = this.getFields(data);
            fields.splice(fields.indexOf('ID'), 1);
            let valueTemplates = fields.map((val) => { return val + " = ?"; });
            let valuesTemplatesString = valueTemplates.join(",");
            let querryString = `UPDATE ` + this.tableName + ` SET ` +
                valuesTemplatesString + ` WHERE ID=?`;
            let valuesArray = fields.map((val) => data[val]);
            valuesArray = [...valuesArray, data['ID']];
            if (this.debug) {
                console.log("******************");
                console.log(querryString);
                console.log("******************");
            }
            // console.log(querryString)
            // console.log(valuesArray)
            let promise = Request(querryString, valuesArray, this.DB);
            yield promise;
        });
    }
    Delete() {
        return __awaiter(this, arguments, void 0, function* () {
            let arg = { id: -1 };
            for (var i = 0; i < arguments.length; i++) {
                arg = arguments[i];
            }
            let fields = this.getFields(arg);
            let questionMarks = fields.map(() => '?');
            let valueTemplates = fields.map((val) => { return val + " = ?"; });
            let valuesTemplatesString = valueTemplates.join(" AND ");
            let valuesArray = fields.map((val) => arg[val]);
            let requestString = "DELETE FROM " + this.tableName + " WHERE " + valuesTemplatesString;
            if (this.debug) {
                console.log("------------------");
                console.log(requestString);
                console.log("------------------");
            }
            let promise = Request(requestString, valuesArray, this.DB);
            yield promise;
        });
    }
}
//# sourceMappingURL=CRUD.js.map
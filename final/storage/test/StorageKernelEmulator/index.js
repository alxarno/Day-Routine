var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import {Table} from './modules/tables'
let rowCounter = 10;
export default class StorageKernelEmulator {
    constructor(testProps, DB) {
        this.TableHand = new TableEmulator(testProps, DB);
    }
    Table() {
        return this.TableHand;
    }
}
class TableEmulator {
    constructor(testPros, DB) {
        this.testProps = testPros;
        this.testData = DB;
    }
    Create(name, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, this.delay));
            //    let sqlBody = this.DecodeTableSchema(schema)
            //  sqlBody = "CREATE TABLE IF NOT EXISTS "+name+"("+sqlBody+")"
            // console.log(sqlBody)
            //let promise = Request(sqlBody,[],this.DB)
            //await promise;
            return new CRUDEmul(name, this.testProps, this.testData[name]);
        });
    }
    Drop(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, this.delay));
            //let sqlBody = "DROP TABLE "+name
            //let promise = Reque
            //st(
            //  sqlBody,
            //  [],
            //  this.DB)
            // await promise;
        });
    }
    GetByName(name) {
        //await new Promise(resolve=>setTimeout(resolve,this.delay))
        return new CRUDEmul(name, this.testProps, this.testData[name]);
        // return new Crud(name,this.DB,  this.debug)
    }
}
class CRUDEmul {
    constructor(tableName, testProps, data) {
        this.testData = [];
        this.tableName = tableName;
        this.testProps = testProps;
        this.testData = data;
    }
    Get() {
        return __awaiter(this, arguments, void 0, function* () {
            let arg = { ID: -1 };
            for (let i = 0; i < arguments.length; i++) {
                arg = arguments[i];
            }
            console.log("CRUD Get data - ", arg);
            yield new Promise(resolve => setTimeout(resolve, this.testProps.delay));
            if (this.testProps.print) {
                console.log("This table name - ", this.tableName);
            }
            if (arg["ID"] != -1) {
                let final = null;
                this.testData.forEach(v => {
                    if (final != null)
                        return;
                    final = v;
                    Object.keys(arg).forEach(k => {
                        if (v[k] !== arg[k])
                            final = null;
                    });
                });
                return [final];
            }
            return this.testData;
        });
    }
    Insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, this.testProps.delay));
            if (this.testProps.print) {
                console.log("CRUD Insert Data: ", data);
            }
            data["ID"] = ++rowCounter;
            this.testData.push(data);
            return rowCounter;
        });
    }
    Update(data) {
        return __awaiter(this, arguments, void 0, function* () {
            let arg = { ID: -1 };
            for (let i = 0; i < arguments.length; i++) {
                arg = arguments[i];
            }
            yield new Promise(resolve => setTimeout(resolve, this.testProps.delay));
            if (this.testProps.print) {
                console.log("CRUD Update Data - ", data);
            }
            if (arg["ID"] != -1) {
                let final = null;
                this.testData.forEach(v => {
                    if (final != null)
                        return;
                    if (v['ID'] != arg["ID"])
                        return;
                    else
                        final = v;
                });
                if (final == null)
                    throw new Error("CRUDEmul: object: " + data + " doesn't exist");
                Object.keys(data).forEach((v) => {
                    if (final.hasOwnProperty(v)) {
                        final[v] = data[v];
                    }
                });
            }
        });
    }
    Delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CRUD delete data - ", data);
            yield new Promise(resolve => setTimeout(resolve, this.testProps.delay));
            if (this.testProps.print) {
                console.log("This table name - ", this.tableName);
            }
            let target = null;
            let targetIndex = -1;
            this.testData.forEach((v, i) => {
                if (target != null)
                    return;
                target = v;
                Object.keys(data).forEach(k => {
                    if (v[k] !== data[k])
                        target = null;
                });
                if (target != null) {
                    targetIndex = i;
                }
            });
            console.log(target, targetIndex);
            if (targetIndex != -1) {
                this.testData.filter((val, ind) => {
                    let result = true;
                    return result;
                    //if(ind == targetIndex) return false;
                    //return true
                    //newData.push(val)
                });
                //this.testData = newData
            }
        });
    }
}
//# sourceMappingURL=index.js.map
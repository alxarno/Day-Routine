var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class DBEmulator {
    constructor(props) {
        this.correctWork = props.correctWork;
        this.delay = props.delay;
        this.print = props.print;
    }
    get LastQuery() {
        return this.lastQuery;
    }
    get LastData() {
        return this.lastData;
    }
    set CorrectWork(correctWork) {
        this.correctWork = correctWork;
    }
    set Answer(rows) {
        this.result = rows;
    }
    transaction(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            callback({ executeSQL: this.executor.bind(this) });
        });
    }
    executor(body, data, callbackSuccess, callbackError) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.print) {
                let printString = "DBEmulator executor print:";
                printString += "\n";
                printString += "SQL Query - " + body;
                printString += "\n";
                printString += "Input data - " + String(data);
                console.log(printString);
            }
            this.lastData = data;
            this.lastQuery = body;
            yield new Promise(resolve => setTimeout(resolve, this.delay));
            if (this.correctWork)
                callbackSuccess(this, { rows: this.result });
            else {
                throw "DBEmulator: SQL Error";
            }
        });
    }
}
//# sourceMappingURL=index.js.map
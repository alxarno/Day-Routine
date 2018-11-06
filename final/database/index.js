import { Table } from './modules/tables';
export class DataBase {
    constructor(props, DBDriver) {
        this.DB = DBDriver;
        if (!this.DB) {
            throw "DB didn't open";
        }
        this.TableHand = new Table(this.DB, props.debug);
    }
    Table() {
        return this.TableHand;
    }
}
//# sourceMappingURL=index.js.map
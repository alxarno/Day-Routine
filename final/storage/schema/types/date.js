export default class SchemaDate {
    constructor() {
    }
    Serial(val) {
        return val.getTime();
    }
    Deserial(val) {
        let fin = new Date();
        fin.setTime(val);
        return fin;
    }
    SchemaNativeType() {
        return Number;
    }
}
//# sourceMappingURL=date.js.map
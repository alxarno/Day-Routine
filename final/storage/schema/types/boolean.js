export default class SchemaBoolean {
    constructor() {
    }
    Serial(val) {
        return (val ? 1 : 0);
    }
    Deserial(val) {
        return (val == 1 ? true : false);
    }
    SchemaNativeType() {
        return Number;
    }
}
//# sourceMappingURL=boolean.js.map
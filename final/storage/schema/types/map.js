export default class SchemaMap {
    constructor() {
    }
    Serial(val) {
        return JSON.stringify(val);
    }
    Deserial(val) {
        return JSON.parse(val);
    }
    SchemaNativeType() {
        return String;
    }
}
//# sourceMappingURL=map.js.map
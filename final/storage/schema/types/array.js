export default class ShcemaArray {
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
//# sourceMappingURL=array.js.map
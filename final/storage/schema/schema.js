export default class Schema {
    constructor(name, schemaBody) {
        this.name = name;
        this.schemaBody = schemaBody;
    }
    TranspilerToPrimitive() {
        let finalObj = {};
        for (let field in this.schemaBody) {
            finalObj[field] = this.schemaBody[field].SchemaNativeType();
        }
        return finalObj;
    }
    Serialization(data) {
        let finalObj = {};
        for (let field in this.schemaBody) {
            if (data.hasOwnProperty(field)) {
                finalObj[field] = this.schemaBody[field].Serial(data[field]);
            }
            else {
                throw "Argument's structure is wrong";
            }
        }
        return finalObj;
    }
    SerializationWithoutID(data) {
        let finalObj = {};
        for (let field in this.schemaBody) {
            if (data.hasOwnProperty(field) || field != 'ID') {
                finalObj[field] = this.schemaBody[field].Serial(data[field]);
            }
            else {
                throw "Argument's structure is wrong";
            }
        }
        return finalObj;
    }
    Deserialization(data) {
        let finalObj = {};
        for (let field in this.schemaBody) {
            if (data.hasOwnProperty(field)) {
                finalObj[field] = this.schemaBody[field].Deserial(data[field]);
            }
            else {
                throw "Argument's structure is wrong";
            }
        }
        return finalObj;
    }
}
//# sourceMappingURL=schema.js.map
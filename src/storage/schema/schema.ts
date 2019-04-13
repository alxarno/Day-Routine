export default class Schema implements StorageSchema.ISchema {
  public name: string;
  public schemaBody: StorageSchema.IScheamBody;

  constructor(name: string, schemaBody: StorageSchema.IScheamBody) {
    this.name = name;
    this.schemaBody = schemaBody;
  }

  public TranspilerToPrimitive() {
    const finalObj: any = {};
    for (const field in this.schemaBody) {
        finalObj[field] = this.schemaBody[field].SchemaNativeType();
    }
    return finalObj;
  }

  public Serialization(data: any): any {
    const finalObj: any = {};
    for (const field in this.schemaBody) {
      if (data.hasOwnProperty(field)) {
        finalObj[field] = this.schemaBody[field].Serial(data[field]);
      } else {
        throw new Error("Serialization argument's structure is wrong");
      }
    }
    return finalObj;
  }

  public SerializationWithoutID(data: any): any {
    const finalObj: any = {};
    for (const field in this.schemaBody) {
      if (data.hasOwnProperty(field) || field !== "ID") {
        finalObj[field] = this.schemaBody[field].Serial(data[field]);
      } else {
        throw new Error("Serialization WID argument's structure is wrong");
      }
    }
    return finalObj;
  }

  public Deserialization(data: any): any {
    const finalObj: any = {};
    for (const field in this.schemaBody) {
      if (data.hasOwnProperty(field)) {
        finalObj[field] = this.schemaBody[field].Deserial(data[field]);
      } else {
        throw new Error("Deserialization argument's structure is wrong");
      }
    }
    return finalObj;
  }

}

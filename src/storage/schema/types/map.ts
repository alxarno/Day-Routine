export default class SchemaMap implements StorageSchema.IMap {
  public Serial(val: object): any {
    return JSON.stringify(val);
  }

  public Deserial(val: any): object {
    return JSON.parse(val);
  }

  public SchemaNativeType(): any {
    return String;
  }
}

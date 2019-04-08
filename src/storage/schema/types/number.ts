export default class SchemaNumber implements StorageSchema.INumber {
  public Serial(val: number): any {
    return val;
  }

  public Deserial(val: any): number {
    return Number(val);
  }

  public SchemaNativeType(): any {
    return Number;
  }
}

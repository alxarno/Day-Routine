export default class ShcemaString implements StorageSchema.IString {
  public Serial(val: string): any {
    return val;
  }

  public Deserial(val: any): string {
    return String(val);
  }

  public SchemaNativeType(): any {
    return String;
  }
}

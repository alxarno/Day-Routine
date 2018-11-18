export default class SchemaBoolean implements StorageSchema.IBoolean {
  public Serial(val: boolean): any {
    return (val ? 1 : 0);
  }

  public Deserial(val: any): boolean {
    return ((val as number) === 1 ? true : false);
  }

  public SchemaNativeType(): any {
    return Number;
  }
}

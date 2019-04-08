export default class SchemaDate implements StorageSchema.IDate {
  public Serial(val: Date): any {
    return val.getTime();
  }

  public Deserial(val: any): Date {
    const fin: Date = new Date();
    fin.setTime((val as number));
    return fin;
  }

  public SchemaNativeType(): any {
    return Number;
  }
}

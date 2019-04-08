export default class ShcemaArray implements StorageSchema.IArray {
  public Serial(val: any[]): string {
    return JSON.stringify(val);
  }

  public Deserial(val: string): any[] {
    return JSON.parse(val);
  }

  public SchemaNativeType(): any {
    return String;
  }
}

declare namespace StorageSchema {

  export interface ISchema {
    name: string;
    schemaBody: IScheamBody;
    TranspilerToPrimitive: () => any;
    Serialization: (a: any) => any;
    Deserialization: (a: any) => any;
    SerializationWithoutID: (a: any) => any;
  }

  export interface IScheamBody {
    [key: string]: ISchemaType<any>;
  }

  export abstract class ISchemaType<T> {
    public abstract Serial(valuer: T): any;

    public abstract Deserial(value: any): T;

    public abstract SchemaNativeType(): any;
  }

  export interface INumber extends ISchemaType<number> {}

  export interface IString extends ISchemaType<string> {}

  export interface IArray extends ISchemaType<any[]> {}

  export interface IDate extends ISchemaType<Date> {}

  export interface IBoolean extends ISchemaType<boolean> {}

  export interface IMap extends ISchemaType<object> {}

}

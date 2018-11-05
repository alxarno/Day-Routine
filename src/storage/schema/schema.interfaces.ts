namespace StorageSchema{

  export interface ISchema{
    name:string;
    schemaBody:IScheamBody;
    TranspilerToPrimitive:Function
    Serialization:Function
    Deserialization:Function
    SerializationWithoutID:Function
  }

  export interface IScheamBody{
    [key:string]:ISchemaType<any>
  }

  export abstract class ISchemaType<T>{
    abstract Serial(valuer: T):any;

    abstract Deserial(value: any):T;

    abstract SchemaNativeType():any;
  }

  export interface INumber extends ISchemaType<Number>{}

  export interface IString extends ISchemaType<String>{}

  export interface IArray extends ISchemaType<Array<any>>{}

  export interface IDate extends ISchemaType<Date>{}

  export interface IBoolean extends ISchemaType<Boolean>{}

  export interface IMap extends ISchemaType<Object>{}

}
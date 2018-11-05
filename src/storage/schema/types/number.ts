export default class SchemaNumber implements StorageSchema.INumber{
  constructor() {
    
  }

  Serial(val:number):any{
    return val
  }

  Deserial(val:any):Number{
    return Number(val)
  }

  SchemaNativeType():any{
    return Number
  }
}
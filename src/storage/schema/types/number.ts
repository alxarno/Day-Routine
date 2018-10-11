export default class SchemaNumber implements StorageSchema.INumber{
  constructor() {
    
  }

  Deserial(val:any):Number{
    return 0
  }

  Serial(val:number):any{
    return val
  }

  SchemaNativeType():any{
    return Number
  }
}
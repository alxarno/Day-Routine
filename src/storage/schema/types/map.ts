export default class SchemaMap implements StorageSchema.IMap{
  
  constructor() {
    
  }

  Serial(val:Object):any{
    return JSON.stringify(val)
  }

  Deserial(val:any):Object{
    return JSON.parse(val)
  }

  SchemaNativeType():any{
    return String
  }
}
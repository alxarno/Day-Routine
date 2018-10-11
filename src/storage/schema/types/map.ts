export default class SchemaMap implements StorageSchema.IMap{
  
  constructor() {
    
  }

  Deserial(val:any):Object{
    return {}
  }

  Serial(val:Object):any{
    return val
  }

  SchemaNativeType():any{
    return String
  }
}
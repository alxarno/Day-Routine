export default class SchemaDate implements StorageSchema.IDate{
  
  constructor() {
    
  }

  Deserial(val:any):Date{
    return new Date()
  }

  Serial(val:Date):any{
    return val
  }

  SchemaNativeType():any{
    return Number
  }
}
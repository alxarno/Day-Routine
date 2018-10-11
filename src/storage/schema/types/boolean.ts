export default class SchemaBoolean implements StorageSchema.IBoolean{
  
  constructor() {
    
  }

  Deserial(val:any):Boolean{
    return false
  }

  Serial(val:boolean):any{
    return val
  }

  SchemaNativeType():any{
    return Number
  }
}
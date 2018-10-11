export default class ShcemaString implements StorageSchema.IString{
  
  constructor() {
    
  }

  Deserial(val:any):String{
    return ""
  }

  Serial(val:string):any{
    return val
  }

  SchemaNativeType():any{
    return String
  }
}
export default class ShcemaString implements StorageSchema.IString{
  
  constructor() {
    
  }

  Serial(val:string):any{
    return val
  }

  Deserial(val:any):String{
    return String(val)
  }

  SchemaNativeType():any{
    return String
  }
}
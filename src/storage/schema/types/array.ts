export default class ShcemaArray implements StorageSchema.IArray{
  
  constructor() {
    
  }

  Deserial(value:string):Array<any>{
    return []
  }

  Serial(val:Array<any>):string{
    return ""
  }

  SchemaNativeType():any{
    return String
  }
}
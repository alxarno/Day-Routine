export default class ShcemaArray implements StorageSchema.IArray{
  
  constructor() {
    
  }

  Serial(val:Array<any>):string{
    return JSON.stringify(val)
  }

  Deserial(val:string):Array<any>{
    return JSON.parse(val)
  }

  SchemaNativeType():any{
    return String
  }
}
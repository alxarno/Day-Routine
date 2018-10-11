export default class SchemaDate implements StorageSchema.IDate{
  
  constructor() {
    
  }

  Serial(val:Date):any{
    return val.getTime()
  }

  Deserial(val:any):Date{
    let fin = new Date()
    fin.setTime(<number>val)
    return fin
  }

  SchemaNativeType():any{
    return Number
  }
}
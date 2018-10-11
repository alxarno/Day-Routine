export default class SchemaBoolean implements StorageSchema.IBoolean{
  
  constructor() {
    
  }
  Serial(val:boolean):any{
    return (val?1:0)
  }

  Deserial(val:any):Boolean{
    return (<number>val==1?true:false)
  }

  SchemaNativeType():any{
    return Number
  }
}
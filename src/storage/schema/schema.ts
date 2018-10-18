export default class Schema implements StorageSchema.ISchema{
  public name:string
  public schemaBody:StorageSchema.IScheamBody

  constructor(name:string, schemaBody:StorageSchema.IScheamBody){
    this.name = name;
    this.schemaBody = schemaBody
  }

  TranspilerToPrimitive(){
    let finalObj:any = {}
    for(let field in this.schemaBody){
        finalObj[field] = this.schemaBody[field].SchemaNativeType()
    }
    return finalObj
  }  

  Serialization(data:any):any{
    let finalObj:any = {}
    for(let field in this.schemaBody){
      if(data.hasOwnProperty(field)){
        finalObj[field] = this.schemaBody[field].Serial(data[field])
      }else{
        throw "Argument's structure is wrong"
      }
    }
    return finalObj
  }

  SerializationWithoutID(data:any):any{
    let finalObj:any = {}
    for(let field in this.schemaBody){
      if(data.hasOwnProperty(field) || field!='ID'){
        finalObj[field] = this.schemaBody[field].Serial(data[field])
      }else{
        throw "Argument's structure is wrong"
      }
    }
    return finalObj
  }

  Deserialization(data:any):any{
    let finalObj:any = {}
    for(let field in this.schemaBody){
      if(data.hasOwnProperty(field)){
        finalObj[field] = this.schemaBody[field].Deserial(data[field])
      }else{
        throw "Argument's structure is wrong"
      }
    }
    return finalObj
  }

}
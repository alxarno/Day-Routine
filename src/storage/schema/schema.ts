export default class Schema implements StorageSchema.ISchema{
  public name:string
  public schemaBody:StorageSchema.IScheamBody

  constructor(name:string, schemaBody:StorageSchema.IScheamBody){
    this.name = name;
    this.schemaBody = schemaBody
  }

  transpilerToPrimitive(){
    let finalObj:any = {}
    for(let field in this.schemaBody){
      finalObj[field] = this.schemaBody[field].SchemaNativeType()
    }
    console.log(finalObj)
  }  

}
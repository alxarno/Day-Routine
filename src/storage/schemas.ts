// import {ISchema} from './schema/schema.interfaces'
// import SchemaNumber from './schema/types/number'
import Schema from './schema/schema'

import {
  SchemaNumber,
  SchemaString,

} from './schema/types'

let RoutinesSchema:StorageSchema.ISchema  = new Schema("routines",{
  actionBody: new SchemaString(),
  actionType: new SchemaNumber(),
  colorScheme: new SchemaString(),
  describe:new SchemaString(),
  hours:new SchemaNumber(),
  ID: new SchemaNumber(),
  name: new SchemaString()
}) 


let DeadZoneSchema:StorageSchema.ISchema = new Schema("dead_zones", {
  
})
// let DeadZoneSchema:Schema = {
//   name:"dead_zones",
//   schema:{
//     name:String,
//     start:Number,
//     done:Number,
//     enable:Boolean,
//     ID:Number,
//     disabled_days:String
//   }
// }

// let SomeSchema:ISchema={
//   name:"test",
//   schemaBody:{
//     age:new SchemaNumber()
//   }
// }

let SomeSchema:StorageSchema.ISchema = new Schema("test",{
  age: new SchemaNumber()
})

let schemas = [SomeSchema]

export default schemas
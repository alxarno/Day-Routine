// import {ISchema} from './schema/schema.interfaces'
// import SchemaNumber from './schema/types/number'
import Schema from './schema/schema'

import {
  SchemaNumber,
  SchemaString,
  SchemaBoolean,
  SchemaArray,

} from './schema/types'


let RoutinesSchema:StorageSchema.ISchema  = new Schema("routines",{
  actionBody: new SchemaString(),
  actionType: new SchemaNumber(),
  colorScheme: new SchemaString(),
  describe:new SchemaString(),
  hours:new SchemaNumber(),
  name: new SchemaString()
}) 


let DeadZoneSchema:StorageSchema.ISchema = new Schema("dead_zones", {
  name: new SchemaString(),
  start: new SchemaNumber(),
  done:new SchemaNumber(),
  enable:new SchemaBoolean(),
  disabled_days: new SchemaArray()
})


// let SomeSchema:ISchema={
//   name:"test",
//   schemaBody:{
//     age:new SchemaNumber()
//   }
// }

let SomeSchema:StorageSchema.ISchema = new Schema("test",{
  age: new SchemaNumber()
})

// let schemas = [SomeSchema]

export {RoutinesSchema, DeadZoneSchema}
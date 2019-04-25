import Schema from "./schema/schema";

import {
  SchemaNumber,
  SchemaString,
  SchemaBoolean,
  SchemaArray,
  SchemaDate,
} from "./schema/types";

const RoutinesSchema: StorageSchema.ISchema  = new Schema("routines", {
  ID: new SchemaNumber(),
  actionBody: new SchemaString(),
  actionType: new SchemaNumber(),
  colorScheme: new SchemaString(),
  describe: new SchemaString(),
  hours: new SchemaNumber(),
  minDurationHours: new SchemaNumber(),
  name: new SchemaString(),
  dayZone: new SchemaNumber(),
});

const DeadZoneSchema: StorageSchema.ISchema = new Schema("dead_zones", {
  ID: new SchemaNumber(),
  name: new SchemaString(),
  start: new SchemaNumber(),
  done: new SchemaNumber(),
  enable: new SchemaBoolean(),
  disabledDays: new SchemaArray(),
});

const StatisticsSchema: StorageSchema.ISchema = new Schema("statist", {
  ID: new SchemaNumber(),
  routineID: new SchemaNumber(),
  spent: new SchemaArray(),
  lastUpdate: new SchemaDate(),
});

export {RoutinesSchema, DeadZoneSchema, StatisticsSchema};

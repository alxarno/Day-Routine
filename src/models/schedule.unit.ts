import { INowTask } from "./now.tasks";
import { IDeadZone } from "./dead_zone";

export interface IScheduleUnit {
  data: INowTask | IDeadZone;
  _type: ScheduleUnitType;
}

export enum ScheduleUnitType {
  Task,
  DeadZone,
}

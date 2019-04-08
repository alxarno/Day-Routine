import { INowTask } from "src/models/now.tasks";

export interface IScheduleState {
  items: Array<INowTask | null>;
}

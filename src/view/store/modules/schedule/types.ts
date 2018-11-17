import { NowTask } from "src/models/now.tasks";

export interface IScheduleState {
  items: Array<NowTask | null>;
}

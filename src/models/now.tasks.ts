import {Action} from './action'

export interface NowTask{
  name: string;
  hours: number;
  describe: string;
  actionBody: string;
  actionType: Action;
  start: number;
  color: string;
}



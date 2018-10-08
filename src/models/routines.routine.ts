import {Action} from './action'

export interface Routine{
  id: number;
  name: string;
  colorScheme: string;
  describe: string;
  hours: number;
  actionBody: string;
  actionType : Action
}
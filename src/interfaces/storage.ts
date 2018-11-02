import IStatistics from 'src/models/statistics'
import { DeadZone } from 'src/models/dead_zone';

export interface IDeadZonesStorage{
  Get:Function;
  Create:{(zone:DeadZone):void};
  Update:Function;
  Delete:Function;
}

export interface IStatisticsStorage{
  Add:{(data:{routineID:number, hours:number}):void};
  Get:Function;
  Delete:Function;
}

export interface IRoutinesStorage{
  Get:Function;
  Create:Function;
  Update:Function;
  Delete:Function;
}

export interface IStorage{
  Statistics:{():IStatisticsStorage}
  Routines:{():IRoutinesStorage}
  DeadZones:{():IDeadZonesStorage}
  changeCallback:Function
}
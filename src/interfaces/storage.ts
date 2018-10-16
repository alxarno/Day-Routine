export interface IDeadZonesStorage{
  Get:Function;
  Create:Function;
  Update:Function;
  Delete:Function;
}

export interface IStatisticsStorage{
  Add:Function;
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
}
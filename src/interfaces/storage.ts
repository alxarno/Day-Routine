export interface IDeadZonesStorage{

}

export interface IStatisticsStorage{

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
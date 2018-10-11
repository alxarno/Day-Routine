export interface IDeadZonesStorage{

}

export interface IStatisticsStorage{

}

export interface IRoutinesStorage{

}

export interface IStorage{
  Statistics:IStatisticsStorage
  Routines:IRoutinesStorage
  DeadZones:IDeadZonesStorage
}

export interface ISettingsCore{
  Import:Function
  Export:Function
  ClearAll:Function
}

export interface IScheduleCore{
  Get:Function
}

export interface IDeadZonesCore{
  Get: Function;
  Create: Function;
  Delete: Function;
  Update: Function;
}

export interface IRoutinesCore{
  Get: Function;
  Create: Function;
  Delete: Function;
  Update: Function;
}

export interface ICore{
  Routines:{():IRoutinesCore}
  Schedule:{():IScheduleCore}
  DeadZones:{():IDeadZonesCore}
  Settings:{():ISettingsCore}
}
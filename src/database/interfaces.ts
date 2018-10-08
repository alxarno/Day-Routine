export interface ITableMeta{
  name:String;
  schema:Object;
}

export interface ITableAPI{
  Create:Function;
  Drop:Function;
  Get:Function;
}

export interface ICRUDActions{
  Get:Function;
  Insert:Function;
  Update:Function;
  Delete:Function;
}
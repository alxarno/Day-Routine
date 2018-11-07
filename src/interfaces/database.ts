export interface ICRUD{
  Get:Function;
  Insert:{(data:{[key:string]:any}):Promise<number>};
  Update:Function;
  Delete:Function;
}

export interface ITableGet{
  (name:string):ICRUD
}

export interface ITableCreate{
  (name:string, schema:{[key:string]:any}):Promise<ICRUD>
}

export interface IPropsDataBase{
  debug:boolean
}
export interface ITableMethods{
  Create:ITableCreate;
  Drop:Function;
  GetByName:ITableGet
}

export interface IDataBaseTable{
  ():ITableMethods
}

export interface IDataBase{
  Table:IDataBaseTable
}


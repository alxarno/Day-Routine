export interface ICRUD{
  Get:Function;
  Insert:Function;
  Update:Function;
  Delete:Function;
}

export interface ITableGet{
  (name:string):Promise<ICRUD>
}

export interface ITableCreate{
  (name:string, schema:{[key:string]:any}):Promise<ICRUD>
}

export interface ITableMethods{
  Create:ITableCreate;
  Drop:Function;
  Get:ITableGet
}

export interface IStorageKernelTable{
  ():ITableMethods
}

export interface IStorageKernel{
  Table:IStorageKernelTable
}


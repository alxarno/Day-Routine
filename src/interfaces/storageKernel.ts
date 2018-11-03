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

export interface IPropsStorageKernel{
  debug:boolean
}
export interface ITableMethods{
  Create:ITableCreate;
  Drop:Function;
  GetByName:ITableGet
}

export interface IStorageKernelTable{
  ():ITableMethods
}

export interface IStorageKernel{
  Table:IStorageKernelTable
}


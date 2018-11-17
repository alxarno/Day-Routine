export interface ICRUD {
  Get: Function;
  Insert: (data: {[key: string]: any}) => Promise<number>;
  Update: Function;
  Delete: Function;
}

export type ITableGet = (name: string) => ICRUD;

export type ITableCreate = (name: string, schema: {[key: string]: any}) => Promise<ICRUD>;

export interface IPropsDataBase {
  debug: boolean;
}
export interface ITableMethods {
  Create: ITableCreate;
  Drop: Function;
  GetByName: ITableGet;
}

export type IDataBaseTable = () => ITableMethods;

export interface IDataBase {
  Table: IDataBaseTable;
}

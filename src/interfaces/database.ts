export interface ICRUD {
  Get: (args?: any) => Promise<any | any[]>;
  Insert: (data: {[key: string]: any}) => Promise<number>;
  Update: (a: any) => Promise<void>;
  Delete: (args?: any) => Promise<void>;
}

export type ITableGet = (name: string) => ICRUD;

export type ITableCreate = (name: string, schema: {[key: string]: any}) => Promise<ICRUD>;

export interface IPropsDataBase {
  debug: boolean;
}
export interface ITableMethods {
  Create: ITableCreate;
  Drop: (name: string) => Promise<void>;
  GetByName: ITableGet;
}

export type IDataBaseTable = () => ITableMethods;

export interface IDataBase {
  Table: IDataBaseTable;
}

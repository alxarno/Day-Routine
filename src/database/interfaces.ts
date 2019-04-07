// export interface ITableMeta{
//   name:String;
//   schema:Object;
// }

// export interface ITableAPI{
//   Create:Function;
//   Drop:Function;
//   Get:Function;
// }

// export interface ICrudActions{
//   Get:Function;
//   Insert:Function;
//   Update:Function;
//   Delete:Function;
// }

export interface IDB {
  transaction: () => void;
}

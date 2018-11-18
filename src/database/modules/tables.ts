import { IDB} from "../interfaces";

import {ITableMethods, ICRUD} from "../../interfaces/database";

import {Crud} from "./CRUD";

import {Request} from "./lib";

export class Table implements ITableMethods {

  private DB: IDB;
  private debug: boolean;
  private cache: {[key: string]: ICRUD} = {};

  constructor(DBConnection: IDB, debug: boolean) {
    this.DB = DBConnection;
    this.debug = debug;
  }

  public async Create(name: string, schema: any) {
    let sqlBody = this.DecodeTableSchema(schema);
    sqlBody = "CREATE TABLE IF NOT EXISTS " + name + "(" + sqlBody + ")";
    // console.log(sqlBody)
    const promise = Request(sqlBody, [], this.DB);

    await promise;

    return new Crud(name, this.DB, this.debug);
  }

  public async Drop(name: string) {
    const sqlBody = "DROP TABLE " + name;
    const promise = Request(
      sqlBody,
      [],
      this.DB);
    await promise;
  }

  public GetByName(name: string): ICRUD {
    if (this.cache.hasOwnProperty(name)) { return this.cache[name]; }
    this.cache[name] = new Crud(name, this.DB,  this.debug);
    return this.cache[name];
  }

  private DecodeTableSchema(schema: { [key: string]: any; }): string {
    let rowSQL = "ID INTEGER PRIMARY KEY ASC, ";
    for (const field of Object.keys(schema)) {
      switch (schema[field]) {
        case String:
          rowSQL += field + " TEXT, ";
          break;
        case Number:
          if (field === "ID") {
            // Already defined
            break;
          }
          rowSQL += field + " INTEGER, ";

          break;
        case Boolean:
          rowSQL += field + " INTEGER, ";
          break;
        case Date:
          rowSQL += field + " INTEGER, ";
          break;
        default:
          throw new Error("Failed decode schema. Type of " + field + " is wrong");
      }
    }
    // Cut last comma and space
    rowSQL = rowSQL.substring(0, rowSQL.length - 2);
    return rowSQL;
  }
}

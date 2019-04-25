import {IDB} from "../interfaces";

import {ICRUD} from "../../interfaces/database";

import {Request} from "./lib";

export class Crud implements ICRUD {
  private tableName: string;
  private DB: IDB;
  private debug: boolean;

  constructor(tableName: string, DBConnection: IDB, debug: boolean) {
    this.tableName = tableName;
    this.DB = DBConnection;
    this.debug = debug;
  }

  public async Get(args?: any) {
    let arg: {[key: string]: any} = {ID: -1};
    for (const a of arguments) {
      arg = a;
    }

    let requestString = "";
    let requestData = [];

    if (arg.ID !== -1) {
      const fields: string[] = this.getFields(arg);

      const valueTemplates: any[] = fields.map((val) => val + " = ?");
      const valuesTemplatesString: string = valueTemplates.join(" AND ");

      requestData = fields.map((val) => arg[val]);

      requestString = "SELECT * FROM " + this.tableName + " WHERE " + valuesTemplatesString;
    } else {
      requestString = "SELECT * FROM " + this.tableName;
    }
    if (this.debug) {
      console.log("===================");
      console.log(requestString);
      console.log("===================");
    }

    const promise = Request(
      requestString,
      requestData, this.DB);

    const data = await promise;

    return data.rows;
  }

  public async Insert(data: {[key: string]: any}): Promise<number> {
    const fields: string[] = this.getFields(data);
    fields.splice(fields.indexOf("ID"), 1);

    const values: any[] = fields.map((val) => data[val]);
    const questionMarks: any[] = fields.map(() => "?");

    const querryString = `INSERT INTO ` + this.tableName +
    ` (` + fields.toString() + `) VALUES (` + questionMarks.toString() + `)`;

    if (this.debug) {
      console.log("++++++++++++++++++");
      console.log(querryString);
      console.log("++++++++++++++++++");
    }
    console.log(values);
    const promise = Request(
      querryString,
      values,
      this.DB);

    const somedata = await promise;
    return somedata.insertId;
  }

  public async Update(data: {[key: string]: any}) {
    if (!data.hasOwnProperty("ID")) {
      throw new Error("Argument haven't ID property");
    }

    const fields: string[] = this.getFields(data);

    fields.splice(fields.indexOf("ID"), 1);

    const valueTemplates: any[] = fields.map((val) => val + " = ?");
    const valuesTemplatesString: string = valueTemplates.join(",");

    const querryString = `UPDATE ` + this.tableName + ` SET ` +
      valuesTemplatesString + ` WHERE ID=?`;

    let valuesArray =  fields.map((val) => data[val]);
    valuesArray =  [...valuesArray, data.ID];

    if (this.debug) {
      console.log("******************");
      console.log(querryString);
      console.log("******************");
    }

    const promise = Request(
      querryString,
      valuesArray,
      this.DB);

    await promise;
  }

  public async Delete(args?: any) {
    let arg: {[key: string]: any} = {id: -1};
    for (const a of arguments) {
      arg = a;
    }

    const fields: string[] = this.getFields(arg);

    const questionMarks: any[] = fields.map(() => "?");

    const valueTemplates: any[] = fields.map((val) => val + " = ?");
    const valuesTemplatesString: string = valueTemplates.join(" AND ");

    const valuesArray =  fields.map((val) => arg[val]);

    const requestString = "DELETE FROM " + this.tableName + " WHERE " + valuesTemplatesString;
    if (this.debug) {
      console.log("------------------");
      console.log(requestString);
      console.log("------------------");
    }

    const promise = Request(
      requestString,
      valuesArray, this.DB);

    await promise;
  }

  private getFields(data: {[key: string]: any}): string[] {
    const fields: string[] = [];
    for (const field in data) {
      fields.push(field);
    }

    return fields;
  }

}

import {DataBase} from "../index";
import {IDataBase} from "../../interfaces/database";
import DBEmulator from "./DBDriverEmulator";

const DBDriverEmulator = new DBEmulator({
  correctWork: true,
  delay: 50,
  print: false,
});

const db: IDataBase = new DataBase(
  {debug: false},
  DBDriverEmulator,
);

test("Table available", async () => {
  const table: any = await db.Table();
  expect(table).not.toBe(undefined);
});

test("Table create", async () => {
  await db.Table().Create("Table1",
   {name: String, hands: Number, born: Date, male: Boolean});
  const expectedValue: string = "CREATE TABLE IF NOT EXISTS" +
  " Table1(ID INTEGER PRIMARY KEY ASC," +
  " name TEXT, hands INTEGER, born INTEGER, male INTEGER)";
  expect(DBDriverEmulator.LastQuery).toBe(expectedValue);
});

test("Table drop", async () => {
  await db.Table().Drop("Table1");
  const expectedValue: string = "DROP TABLE Table1";
  expect(DBDriverEmulator.LastQuery).toBe(expectedValue);
});

test("Get", async () => {
  DBDriverEmulator.Answer = [{ID: 23}];
  await db.Table().GetByName("Table1").Get({ID: 23, name: "Jimbo"});
  const expected: string = "SELECT * FROM Table1 WHERE ID = ? AND name = ?";
  expect(DBDriverEmulator.LastQuery).toBe(expected);
  expect(DBDriverEmulator.LastData).toEqual([23, "Jimbo"]);
});

test("Update", async () => {
  await db.Table().GetByName("Table1").Update({ID: 23, name: "Jimbo"});
  const expected: string = "UPDATE Table1 SET name = ? WHERE ID=?";
  expect(DBDriverEmulator.LastQuery).toBe(expected);
  expect(DBDriverEmulator.LastData).toEqual(["Jimbo", 23]);
});

test("Delete", async () => {
  await db.Table().GetByName("Table1").Delete({ID: 23, name: "Jimbo"});
  const expected: string = "DELETE FROM Table1 WHERE ID = ? AND name = ?";
  expect(DBDriverEmulator.LastQuery).toBe(expected);
  expect(DBDriverEmulator.LastData).toEqual([23, "Jimbo"]);
});

test("Insert", async () => {
  await db.Table().GetByName("Table1").Insert({ID: 23, name: "Jimbo"});
  const expected: string = "INSERT INTO Table1 (name) VALUES (?)";
  expect(DBDriverEmulator.LastQuery).toBe(expected);
  expect(DBDriverEmulator.LastData).toEqual(["Jimbo"]);
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataBase } from '../index';
import DBEmulator from './DBDriverEmulator';
let DBDriverEmulator = new DBEmulator({
    correctWork: true,
    delay: 50,
    print: false
});
let db = new DataBase({ debug: false }, DBDriverEmulator);
test('Table available', () => __awaiter(this, void 0, void 0, function* () {
    let table = yield db.Table();
    expect(table).not.toBe(undefined);
}));
test('Table create', () => __awaiter(this, void 0, void 0, function* () {
    yield db.Table().Create("Table1", { name: String, hands: Number, born: Date, male: Boolean });
    let expectedValue = "CREATE TABLE IF NOT EXISTS" +
        " Table1(ID INTEGER PRIMARY KEY ASC," +
        " name TEXT, hands INTEGER, born INTEGER, male INTEGER)";
    expect(DBDriverEmulator.LastQuery).toBe(expectedValue);
}));
test("Table drop", () => __awaiter(this, void 0, void 0, function* () {
    yield db.Table().Drop("Table1");
    let expectedValue = "DROP TABLE Table1";
    expect(DBDriverEmulator.LastQuery).toBe(expectedValue);
}));
test("Get", () => __awaiter(this, void 0, void 0, function* () {
    DBDriverEmulator.Answer = [{ ID: 23 }];
    yield db.Table().GetByName("Table1").Get({ ID: 23, name: "Jimbo" });
    let expected = "SELECT * FROM Table1 WHERE ID = ? AND name = ?";
    expect(DBDriverEmulator.LastQuery).toBe(expected);
    expect(DBDriverEmulator.LastData).toEqual([23, "Jimbo"]);
}));
test("Update", () => __awaiter(this, void 0, void 0, function* () {
    yield db.Table().GetByName("Table1").Update({ ID: 23, name: "Jimbo" });
    let expected = "UPDATE Table1 SET name = ? WHERE ID=?";
    expect(DBDriverEmulator.LastQuery).toBe(expected);
    expect(DBDriverEmulator.LastData).toEqual(["Jimbo", 23]);
}));
test("Delete", () => __awaiter(this, void 0, void 0, function* () {
    yield db.Table().GetByName("Table1").Delete({ ID: 23, name: "Jimbo" });
    let expected = "DELETE FROM Table1 WHERE ID = ? AND name = ?";
    expect(DBDriverEmulator.LastQuery).toBe(expected);
    expect(DBDriverEmulator.LastData).toEqual([23, "Jimbo"]);
}));
test("Insert", () => __awaiter(this, void 0, void 0, function* () {
    yield db.Table().GetByName("Table1").Insert({ ID: 23, name: "Jimbo" });
    let expected = "INSERT INTO Table1 (name) VALUES (?)";
    expect(DBDriverEmulator.LastQuery).toBe(expected);
    expect(DBDriverEmulator.LastData).toEqual(["Jimbo"]);
}));
//# sourceMappingURL=database.test.js.map
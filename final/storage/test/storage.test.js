var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StorageKernelEmulator from './StorageKernelEmulator';
import { Storage } from '../index';
let db = new StorageKernelEmulator({
    print: true,
    delay: 50
}, {
    "statist": [
        { ID: 1, routineID: 2, spent: "[0,5,0,1,1,1,2]", lastUpdate: new Date().getTime() },
        { ID: 2, routineID: 3, spent: "[0,0,0,1,1,1,2]", lastUpdate: new Date().getTime() },
        { ID: 3, routineID: 4, spent: "[0,1,0,1,4,1,2]", lastUpdate: new Date().getTime() }
    ]
});
let callback = (data) => {
};
let testStorage = new Storage(db, callback);
test("Storage Create", () => {
    expect(testStorage).not.toBe(undefined);
});
//Statistics unsupport get certain objects, only all rows
test("Storage: Statistics Get All", () => __awaiter(this, void 0, void 0, function* () {
    let stat = yield testStorage.Statistics().Get();
    expect(stat.length).toBe(3);
}));
test("Storage: Statistics Add", () => __awaiter(this, void 0, void 0, function* () {
    yield testStorage.Statistics().Add({ routineID: 2, hours: 5 });
    let state = yield testStorage.Statistics().Get();
    expect(state[0].spent).toEqual([0, 5, 0, 1, 1, 1, 7]);
}));
test("Storage: Statistics Delete", () => __awaiter(this, void 0, void 0, function* () {
    yield testStorage.Statistics().Delete({ routineID: 2 });
    let state = yield testStorage.Statistics().Get();
    expect(state.length).toBe(2);
}));
//# sourceMappingURL=storage.test.js.map
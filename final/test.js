var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CreateDB } from './database/test/database.test';
import { CreateStorage } from './storage/test/storage.test';
import { Action } from './models/action';
export function TEST() {
    return __awaiter(this, void 0, void 0, function* () {
        let db = CreateDB();
        let storage = CreateStorage(db);
        // await storage.DeadZones().Delete({
        //   ID:2
        // })
        // await storage.DeadZones().Create({
        //   disabled_days: [],
        //   start: 23,
        //   done: 7,
        //   enable:true,
        //   ID:-1,
        //   name:"Sleep ZzZ"
        // })
        yield storage.Routines().Create({
            ID: -1,
            name: "abc",
            colorScheme: "orange",
            describe: "...",
            hours: 7,
            actionBody: "",
            actionType: Action.File
        });
        // await db.Table().Drop("smuglers")
        // let table = await db.Table().Create("smuglers", {name:String})
        // await table.Insert({name: "ABC"})
        // console.log(await table.Get())
        // await table.Update({ID:1, name:"CBA"})
        // console.log(await table.Get())
        // await table.Delete({name:"CBA"})
        // console.log(await table.Get())
    });
}
//# sourceMappingURL=test.js.map
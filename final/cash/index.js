export class CashLocalStorage {
    constructor() {
        this.mystorage = window.localStorage;
    }
    getDate() {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "" + month + "" + day + "_";
    }
    Set(body) {
        this.mystorage.setItem(this.getDate() + "cash", body);
    }
    Get() {
        let result = this.mystorage.getItem(this.getDate() + "cash");
        if (result == null) {
            this.Set("{}");
            return this.Get();
        }
        ;
        return result;
    }
    Clear() {
        this.mystorage.clear();
    }
}
//# sourceMappingURL=index.js.map
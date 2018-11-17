import {ICache} from "src/interfaces/cache";

export class CashLocalStorage implements ICache {
	public mystorage: Storage;

	constructor() {
		this.mystorage = window.localStorage;
	}

	public Set(body: string) {
		this.mystorage.setItem(this.getDate() + "cash", body);
	}

	public Get(): string {
		 const result = this.mystorage.getItem(this.getDate() + "cash");
		 if (result == null) {
		 	this.Set("{}");
		 	return this.Get();
		 }
		 return result;
	}

	public Clear() {
    this.mystorage.clear();
    this.Set("{}");
	}

	private getDate(): string {
		const dateObj = new Date();
		const month = dateObj.getUTCMonth() + 1; // months from 1-12
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear();

		return year + "" + month + "" + day + "_";
	}
}

import {ICash} from 'src/interfaces/cash'

export class CashLocalStorage implements ICash{
	mystorage:Storage

	constructor(){
		this.mystorage = window.localStorage
	}

	private getDate():string{
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();

		return year +""+ month +"" + day+"_";
	}

	Set(body:string){
		this.mystorage.setItem(this.getDate()+"cash", body)
	}

	Get():string{
		 let result = this.mystorage.getItem(this.getDate()+"cash")
		 if (result == null) {
		 	this.Set("{}");
		 	return this.Get();
		 };
		 return result
	}

	Clear(){
		this.mystorage.clear()
	}
}
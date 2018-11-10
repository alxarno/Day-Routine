export interface ICache {
	Get:{():string}
	Set:{(body:string):void}
	Clear:{():void}
}

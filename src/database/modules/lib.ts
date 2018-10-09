export function Request(body:string, data:any, DB:any):Promise<any>{
  return new Promise(function(resolve:Function, reject:Function) {
    this.transaction(function(tx){
      tx.executeSql(body, 
        data,
        function(tx:any, results:any){
          resolve(results)
        },
        reject);
      });
  }.bind(DB))
}

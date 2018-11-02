export function Request(body:string, data:any, DB:any):Promise<any>{
  return new Promise(function(resolve:Function, reject:Function) {
    (this as {transaction:Function}).transaction(function(tx:{executeSql:Function}){
      tx.executeSql(body, 
        data,
        function(tx:any, results:any){
          resolve(results)
        },
        reject);
      });
  }.bind(DB))
}

export function Request(body:string, data:any, DB:any):Promise<any>{
  return new Promise(ForPromise(body,data, DB))
}

function ForPromise(body:string, data:any, DB:{transaction:Function}):
  {(resolve:Function, reject:Function):void}{
  return (resolve:Function, reject:Function)=>{
    DB.transaction(function(tx:{executeSQL:Function}){
      tx.executeSQL(body, 
        data,
        function(tx:any, results:any){
          resolve(results)
        },
        reject);
      });
  }
}

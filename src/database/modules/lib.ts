export function Request(body: string, data: any, DB: any): Promise<any> {
  return new Promise(ForPromise(body, data, DB));
}
// tslint:disable
function ForPromise(body: string, data: any, DB: {transaction: Function}):
  (resolve: Function, reject: Function) => void {
  return (resolve: Function, reject: Function) => {
    DB.transaction(function(tx: {executeSql: Function}) {
      tx.executeSql(body,
        data,
        function(tx: any, results: any) {
          resolve(results);
        },
        reject);
      });
  };
}
// tslint:enable

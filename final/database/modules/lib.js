export function Request(body, data, DB) {
    return new Promise(ForPromise(body, data, DB));
}
function ForPromise(body, data, DB) {
    return (resolve, reject) => {
        DB.transaction(function (tx) {
            tx.executeSQL(body, data, function (tx, results) {
                resolve(results);
            }, reject);
        });
    };
}
//# sourceMappingURL=lib.js.map
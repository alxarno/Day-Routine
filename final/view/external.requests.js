import ExternalAPI from './external.api';
var externalRequests = new (ExternalAPI);
var wasRegisterd = false;
function RegisterExternalApi(eRequests) {
    externalRequests = eRequests;
    wasRegisterd = true;
}
function ExternalRequests() {
    if (wasRegisterd) {
        return externalRequests;
    }
    else {
        throw "External Api has't registered, use method RegisterExternalApi";
    }
}
export default { RegisterExternalApi, ExternalAPI };
//# sourceMappingURL=external.requests.js.map
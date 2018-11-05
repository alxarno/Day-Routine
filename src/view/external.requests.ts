import ExternalAPI from './external.api'

var externalRequests:ExternalAPI = new(ExternalAPI)
var wasRegisterd:boolean = false

function RegisterExternalApi(eRequests: ExternalAPI){
  externalRequests = eRequests
  wasRegisterd = true
}

function ExternalRequests():ExternalAPI{
  if(wasRegisterd){
    return externalRequests
  }else{
    throw "External Api has't registered, use method RegisterExternalApi";
  }
}

export default {RegisterExternalApi, ExternalAPI}

import WebCrypto from "./web/crypto";
import { ICrypto } from "./interfaces";
import { NodeCrypto } from "./node";

export default (typeof window === "undefined" ?
  new NodeCrypto() :
  new WebCrypto()
);

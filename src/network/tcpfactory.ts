import { TCPConn, ISocket, ISettingForTCP } from "./tcpconn";
import { IMessage } from "./messages";
import { GenerateKeys } from "./crypto";
import { settings } from "src/view/store/modules/settings";

export interface ITCPFactory {
  Init: (settingsFunc: () => ISettingForTCP,
         recive: (msg: IMessage) => void,
         close: (ID: number) => void,
         tcpdebug: boolean,
         name: string) => Promise<boolean>;
  Create: (socket: ISocket, fresh: boolean) => TCPConn;
}

export class TCPFactory implements ITCPFactory {

  private IDCounter: number = 0;
  private settings: (() => ISettingForTCP) | null = null;
  private debug: boolean = false;
  private serverName: string = "";

  // Test key for test, it will overwrite within startup
  private publicKey: Buffer = Buffer.from(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ZYQLxtaE0UgFXTFlRwS
u8wz5Gq9amZIk4Q6NqXdnbIPEAIQdXAlqHFy7JJ60m9XNCcZfNFFyAERc2HuthrU
kQaBoYzPFBcESBXh0Uj+yI87FNjQ8d8FccvJawa0i0tcgkyr5E/xSG38ZeX8KIWF
rsEUjHgBOIZ6d2hrkWlUOSYTFeESEjCjF/A7PtyJM0ewcwjdvmUD8nm3m/LKg8Xt
TLyClo4r9R/IAva6Lk69rFf2v52QVnC1vQMhZJeJXdjOvW4Pw6hee+DsSYPL/ri2
8+2HnWTWfpTiD5OKAw39eHmpFgvYa4yfmxun2GkQhp1y916OXWAG7karrCtx20R5
YQIDAQAB
-----END PUBLIC KEY----`);
  // Test key for test, it will overwrite within startup
  private privateKey: Buffer = Buffer.from(`-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIQrpwi59x+DgCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDHyzdjffFj2ug6UwAroxb5BIIE
0BDkys1jWQmaIi64dlOVaQXuqykDELmGL/1wQ2HeOz8McQCgz+hkqH2WGug3l4Mh
sXMCxG4fqunvnqv5at9v7hnyyuEZhxRWWftZC005AOZJa3ukbJZA+oAgGfFPzHnl
qz07eXA3+IIEMri18UwcxGyo7YF35EVDkLt6xj8ndtW4nxPtNsQRp72gxAvYj4xQ
9QhaN9thS6+yrYELnCP/3BschrGDQpAPoOEEFfyuI9fKGXj9N9xo136ohrV2OiH/
RShTkMKGejc9yd6cdcTF+ANghByv1fQfa+QVsqEen0brxTAiorLCBWjaDU3CsUYf
pulrXDXMdmysGYLXfUITJ/DGup6YGHwpi9Bvi4LfP2TyjrIMjuq8sQugyZdH3KUN
3mJQ5QFJielpO+MK2fds0zp2vgqobzM540L0g/6TbeiDvF4R+PQihLXbfAjxKsxK
U9BIWvoGD8uYoiDKKu8ELFQdBFdTMCimK6owSOA2kH/WW/7ARwgQzH+XmMctWrGc
lyT/Mnh69SvrpzMiyG8WgV02zzvtV3n3tkbgDU3PjIzrF9BsqusEgydxGi8g1vKS
rDgwU3ERJxgRz2SVVzEQZKGMlQ/u1uugUQ8vnwDVpK7jiwVc3rnVxp6G8D8L2IpH
xzrStplfnGmrs9WB/AVml9auGeWfO3D2O+xfRtqxVWbZPLILn7sJsWokdWaUVo0e
GEmhBTAWbvDWkZMTw9jjVF97FrDr5jkxF/B0gD8eafJksTI1FrRBUq1YH9A/OzCf
5mFLgUz6DifrYF/+tdT4ko6vmw3h3rOzNPxZ3hBpLRppVmI5LR0ZPeh5lJhnaqzb
iSQ3EvSRfctmdhEyhTbpBZTLa0rcbrGD+Gf9wVsQtHK7yuYJ8X/21mdZp2Cn1tyd
GHoPNkow7/qFSiUWuPH4Oex972yT8BQIJXWOCcdFo2iae9gkgC+qGZWrZjjDNf1H
BynSvAr97YzYIG+5WCrc9fNp8ojlRbn7qj0fozUXTvjHE1ZAs/bauzzAmOifG0FL
WwTkYglgqSFj/yYvRtFqsXerfmUM54CIaz8MX1WM0vIsQw67DmBWdqSiRHkGDgME
/PRg0d0s78I9BIwNzH6eHL0rxZdfeNbxvtdJQd6U1Qwdu/MP/AAIIPk2isfS/QUt
7xD5lxPMpZZU2DVP0MEd+TmM6NOXvLCo3oeOl3hezp2NY18vbk6YZCQqjod+4ANU
Rw+R0nW9qE4yZ3sAELh/WSSP7Nz4HCEVRX01C0Cs4SJxEx6pC8RgAvBD3lME82v1
1PtKMh916PK3B3SpA1pqnlrmZWM65bzdSbprU3o6ZPn+bfvoSpvHEi0PQV1SDKOh
+zI5iQFfTvf9FGy0BbUvqcrSV7fVRvK4dLh00akGVoFOCvP4wFtEHk2/DBCoVcrd
zm6yDKvMJ03U2dxbZx5nImY9Oq8P+/bwzAz1X2rzAQnSzE1vqp8B5P9hK0I60vmR
nLkcw4yY1qQSDLskZnYpf4g0aOkKIb7FT0zNs2jNafxl4Ch5i3hWnmGQtPN+nhJC
YOPgIoQUfXCxLOfPLZKVcxUWbGqGM/UFyz68m1h+0WrponMhghyaC1bc0Sj8No/Y
1Y7ptZ9ppGN1np2ypSDftC0wtXzs+AYf4rCCLodr2E/b
-----END ENCRYPTED PRIVATE KEY-----`);
  private recieved: ((msg: IMessage) => void) | null = null;
  private closed: ((ID: number) => void) | null = null;

  constructor() {
    //
  }

  public async Init(settingsFunc: () => ISettingForTCP,
                    recive: (msg: IMessage) => void,
                    close: (ID: number) => void,
                    tcpdebug: boolean,
                    name: string): Promise<boolean> {
  this.settings = settingsFunc;
  this.debug = tcpdebug;
  this.serverName = name;
  this.recieved = recive;
  this.closed = close;
  try {
    if (this.debug) {
      console.log(`${this.serverName}: Generating RSA keys ...`);
    }
    const keys = await GenerateKeys(this.settings().UserPass);

    this.publicKey = keys.pub;
    this.privateKey = keys.priv;
    if (this.debug) {
      console.log(`${this.serverName}: RSA keys created`);
    }
  } catch (e) {
    if (this.debug) {
      console.log(`${this.serverName}: TCP cannot create keys - error ${e}`);
    }
    return false;
  }
  return true;
  }

  public Create(socket: ISocket, fresh: boolean) {
    return new TCPConn(socket, fresh, this.IDCounter++, this.debug,
      this.serverName, this.settings!, this.publicKey, this.privateKey,
      this.recieved!, this.closed!);
  }
}

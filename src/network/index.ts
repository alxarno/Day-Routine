import { ISync,  ISyncAnswer, ISyncData, ISyncInitData } from "src/interfaces/sync";
import { ISettings } from "src/interfaces/settingsStore";
import { UDPServer} from "./udpserver";
import {TCPServer} from "./tcpserver";
import { Action, MessageType, NetworkMessage } from "./messages";
import { IUDPServer, IRequestInfo, ITCPServer } from "./interfaces";

interface INetworkBufferedRequests {
  Action: Action;
  IP: string;
  NetworkID: string;
}

const START_WITHOUT_INIT = "Starting server without initializationg. Use Init() before starting.";

export default class Network implements ISync {
  private dbScehmaVersion: string;
  private settings: () => ISettings;
  private udpserver: IUDPServer | null = null;
  private tcpserver: ITCPServer | null = null;
  private debug: boolean;
  private portTCP: number;
  private portUDP: number;
  private binded = false;
  private bufferRequests: INetworkBufferedRequests[] = [];
  private newDataRequest: ((networkID: string) => void) | null = null;
  private newDataDistribution: ((networkID: string) => void) | null = null;
  private getDataForTransmition: (() => string) | null = null;
  private gotDataFromTransmition: ((data: string) => void) | null = null;

  constructor(dbSchemaVersion: string, settings: () => ISettings,
              debug: boolean, portTCP: number, portUPD: number) {
    this.portTCP = portTCP;
    this.portUDP = portUPD;
    this.debug = debug;
    this.dbScehmaVersion = dbSchemaVersion;
    this.settings = settings;

  }

  public Start() {
    if (!this.newDataDistribution || !this.newDataRequest ||
      !this.gotDataFromTransmition || ! this.getDataForTransmition) {
        throw new Error(START_WITHOUT_INIT);
    }
    this.udpserver = new UDPServer(this.debug, this.portUDP,
      this.Receive.bind(this),
      this.Error.bind(this),
      this.Created.bind(this),
    );
    this.tcpserver = new TCPServer(this.debug, this.portTCP,
      this.Receive.bind(this),
      this.Error.bind(this),
      () => {/**/},
    );

  }

  public Init(data: ISyncInitData) {
    this.newDataDistribution = data.newDataDistribution;
    this.newDataRequest = data.newDataRequest;
    this.getDataForTransmition = data.getDataForTransmition;
    this.gotDataFromTransmition = data.gotDataFromTransmition;
  }

  public DismissRequest(networkID: string) {
    this.popFromBuffer(networkID);
  }

  public AcceptRequest(networkID: string) {
    const request = this.bufferRequests.find((req: INetworkBufferedRequests) => req.NetworkID === networkID);
    if (!request || !this.tcpserver) {return; }
    if (request.Action === Action.Request) {
      if (!this.getDataForTransmition) {return; }
      const data = this.getDataForTransmition();
      this.tcpserver.PushDataTo(request.IP, data);
    }
    if (request.Action === Action.Distribution) {
      if (!this.gotDataFromTransmition) {
        this.tcpserver.GetDataFrom(request.IP);
      }
    }
  }

  public async Broadcast(data: ISyncData): Promise<void> {
      // this.server.SendMulticast();
  }

  public async Request(): Promise<ISyncAnswer> {
    const res: any =  await new Promise((res, rej) => {
      rej(new Error("Fuck"));
    });
    return {data: null, error: new Error("Fuck")};
    //
  }

  public Close() {
    if (this.udpserver) {
      this.udpserver.Close();
    }
  }

  public Created() {
    this.binded = true;
    this.udpserver!.SendMulticast({
      Action: Action.Request,
      NetworkID: this.settings().NetworkID,
      Pass: "",
      Type: MessageType.Greeting,
    });
  }

  private Receive(msg: string , rinfo: IRequestInfo) {
    if (this.debug) {
      console.log(`Server recive ${msg} from ${rinfo.address}:${rinfo.port}`);
    }
    const messageO = JSON.parse(msg);
    if (messageO.hasOwnProperty("Type")) {
      const message = (messageO as NetworkMessage);
      // if (message.NetworkID === this.settings().NetworkID) {return; }
      switch (message.Action) {
        case Action.Request:
          this.pushToBuffer(message, rinfo.address);
          this.newDataRequest!(message.NetworkID);
          break;
        case Action.Distribution:
          this.pushToBuffer(message, rinfo.address);
          this.newDataDistribution!(message.NetworkID);
          break;
      }

    } else {
      return;
    }
   }

  private Error(err: Error) {
    if (this.debug) {
      console.log(`Server error ${err}`);
    }
  }

  private pushToBuffer(m: NetworkMessage, address: string) {
    this.bufferRequests.push({
      Action: m.Action,
      IP: address,
      NetworkID: m.NetworkID,
    });
  }

  private popFromBuffer(networkID: string) {
    this.bufferRequests = this.bufferRequests.filter((v) => v.NetworkID !== networkID);
  }

}

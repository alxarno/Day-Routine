import { ISync,  ISyncAnswer, ISyncData, ISyncInitData } from "src/interfaces/sync";
import { ISettings } from "src/interfaces/settingsStore";
import { UDPServer} from "./udpserver";
import {TCPServer} from "./tcpserver";
import { Action, MessageType, NetworkMessage, ISendDataMessage, INeedDataMessage } from "./messages";
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
  private servicesTCP: number;
  private servicesUDP: number;
  private name: string;

  private binded = false;
  private bufferRequests: INetworkBufferedRequests[] = [];
  private newDataRequest: ((networkID: string) => void) | null = null;
  private newDataDistribution: ((networkID: string) => void) | null = null;
  private getDataForTransmition: (() => string) | null = null;
  private gotDataFromTransmition: ((data: any, dbSchemaVersion: string) => void) | null = null;

  constructor(dbSchemaVersion: string, settings: () => ISettings,
              debug: boolean, portTCP: number, servicesTCP: number,
              portUPD: number, servicesUDP: number, name: string) {
    this.portTCP = portTCP;
    this.servicesTCP = servicesTCP;
    this.portUDP = portUPD;
    this.servicesUDP = servicesUDP;
    this.debug = debug;
    this.name = name;
    this.dbScehmaVersion = dbSchemaVersion;
    this.settings = settings;

  }

  public async Start(): Promise<boolean> {
    if (!this.newDataDistribution || !this.newDataRequest ||
      !this.gotDataFromTransmition || ! this.getDataForTransmition) {
        throw new Error(START_WITHOUT_INIT);
    }
    const udp = new Promise((res, rej) => {
      this.udpserver = new UDPServer(this.debug, this.portUDP, this.servicesUDP,
        this.name,
        this.Receive.bind(this),
        () => rej(),
        () => res(),
      );
    });
    const tcp = new Promise((res, rej) => {
      this.tcpserver = new TCPServer(this.debug, this.portTCP, this.servicesTCP,
        this.name,
        this.Receive.bind(this),
        () => rej(),
        () => res(),
      );
    });
    Promise.all([udp, tcp]).then((result) => console.log(result));

    return true;
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
    this.popFromBuffer(networkID);
    if (!request || !this.tcpserver) {return; }
    if (request.Action === Action.Request || request.Action === Action.NeedData) {
      if (!this.getDataForTransmition) {return; }
      // console.log("Send data request and need data");
      const data = this.getDataForTransmition();
      const sendData: ISendDataMessage = {
        Action: Action.SendData,
        DBSchemaVersion: this.dbScehmaVersion,
        Data: data,
        NetworkID: this.settings().NetworkID,
        Pass: "",
        Type: MessageType.Transfer,
      };
      this.tcpserver.PushDataTo(request.IP, JSON.stringify(sendData));
    }
    if (request.Action === Action.Distribution) {
      // if (!this.gotDataFromTransmition) {
        // console.log("Send data distr");
        const sendData: INeedDataMessage = {
          Action: Action.NeedData,
          DBSchemaVersion: this.dbScehmaVersion,
          NetworkID: this.settings().NetworkID,
          Pass: "",
          Type: MessageType.Greeting,
        };
        this.tcpserver.PushDataTo(request.IP, JSON.stringify(sendData));
        // this.tcpserver.GetDataFrom(request.IP);
      // }
    }

  }

  public Broadcast(): void {
    this.sendUDPGreeting(Action.Distribution);
  }

  public Request(): void {
    this.sendUDPGreeting(Action.Request);
    // return {data: null, error: new Error("Fuck")};
    //
  }

  public Close() {
    if (this.udpserver) {
      this.udpserver.Close();
    }
    if (this.tcpserver) {
      this.tcpserver.Close();
    }
  }

  public Created() {
    this.binded = true;
    this.Broadcast();
    // this.sendUDPGreeting(Action.Request);
  }
  // Recieve UDP and TCP dgams, but user's data transfering use TCP connection
  private Receive(msg: string , rinfo: IRequestInfo) {
    if (this.debug) {
      console.log(`${this.name}: Recived ${msg} from ${rinfo.address}:${rinfo.port}`);
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
        case Action.SendData:
          this.pushToBuffer(message, rinfo.address);
          this.gotDataFromTransmition!(
            (message as ISendDataMessage).Data,
            (message as ISendDataMessage).DBSchemaVersion);
          break;
        case Action.NeedData:
          this.pushToBuffer(message, rinfo.address);
          this.newDataDistribution!(message.NetworkID);
          break;
      }

    } else {
      return;
    }
   }

  private sendUDPGreeting(action: Action) {
    this.udpserver!.SendMulticast({
      Action: action,
      NetworkID: this.settings().NetworkID,
      Pass: "",
      Type: MessageType.Greeting,
    });
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

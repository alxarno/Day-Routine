import { ISync,  ISyncAnswer, ISyncData, ISyncInitData } from "src/interfaces/sync";
import { ISettings } from "src/interfaces/settingsStore";
import { UDPServer} from "./udpserver";
import {TCPServer} from "./tcpserver";
import { Action, MessageType, NetworkMessage, ISendDataMessage, INeedDataMessage, IMessage } from "./messages";
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
  private generateKeys: boolean;

  private binded = false;
  private bufferRequests: IMessage[] = [];
  private newDataRequest: ((networkID: string) => void) | null = null;
  private newDataDistribution: ((networkID: string) => void) | null = null;
  private getDataForTransmition: (() => Promise<string>) | null = null;
  private gotDataFromTransmition: ((data: any, dbSchemaVersion: string) => void) | null = null;
  private getPassword: ((networkID: string) => Promise<string>) | null = null;
  private failedDecode: ((networkID: string) => Promise<string>) | null = null;
  private successDecode: ((syncID: string, pass: string) => Promise<void>) | null = null;

  constructor(dbSchemaVersion: string, settings: () => ISettings,
              debug: boolean, portTCP: number, servicesTCP: number,
              portUPD: number, servicesUDP: number, name: string, generateKeys: boolean) {
    this.portTCP = portTCP;
    this.servicesTCP = servicesTCP;
    this.portUDP = portUPD;
    this.servicesUDP = servicesUDP;
    this.debug = debug;
    this.name = name;
    this.dbScehmaVersion = dbSchemaVersion;
    this.settings = settings;
    this.generateKeys = generateKeys;

  }

  public async Start(): Promise<boolean> {
    if (!this.newDataDistribution || !this.newDataRequest ||
      !this.gotDataFromTransmition || ! this.getDataForTransmition ||
      !this.getPassword || !this.failedDecode) {
        throw new Error(START_WITHOUT_INIT);
    }
    await new Promise(async (res, rej) => {
      this.tcpserver = new TCPServer(this.debug, this.portTCP, this.servicesTCP,
        this.name,
        () => this.settings(),
        this.Receive.bind(this),
        this.getPassword!.bind(this),
        this.failedDecode!.bind(this),
        this.successDecode!.bind(this),
      );
      await this.tcpserver.Start();
      this.udpserver = new UDPServer(this.debug, this.portUDP, this.servicesUDP,
        this.name,
        this.Receive.bind(this),
        () => rej(),
        () => res(),
      );
    });
    return true;
  }

  public Init(data: ISyncInitData) {
    this.newDataDistribution = data.newDataDistribution;
    this.newDataRequest = data.newDataRequest;
    this.getDataForTransmition = data.getDataForTransmition;
    this.gotDataFromTransmition = data.gotDataFromTransmition;
    this.getPassword = data.getPassword;
    this.failedDecode = data.failedDecode;
    this.successDecode = data.successDecode;
  }

  public DismissRequest(networkID: string) {
    this.popFromBuffer(networkID);
  }

  public async AcceptRequest(networkID: string) {
    if (this.debug) {
      console.log(`${this.name}: Request accepted from ${networkID}`);
    }
    const request = this.bufferRequests.find((req: IMessage) => req.message.NetworkID === networkID);
    this.popFromBuffer(networkID);
    if (!request || !this.tcpserver) {return; }
    if (request.message.Action === Action.Request || request.message.Action === Action.NeedData) {
      if (!this.getDataForTransmition) {return; }
      // console.log("Send data request and need data");
      const data = await this.getDataForTransmition();
      const sendData: ISendDataMessage = {
        Action: Action.SendData,
        DBSchemaVersion: this.dbScehmaVersion,
        Data: data,
        NetworkID: this.settings().NetworkID,
        Type: MessageType.Transfer,
      };
      this.tcpserver.PushDataTo(request.IP, JSON.stringify(sendData));
    }
    if (request.message.Action === Action.Distribution) {
        const sendData: INeedDataMessage = {
          Action: Action.NeedData,
          DBSchemaVersion: this.dbScehmaVersion,
          NetworkID: this.settings().NetworkID,
          Type: MessageType.Greeting,
        };
        this.tcpserver.PushDataTo(request.IP, JSON.stringify(sendData));
    }

  }

  public Broadcast(): void {
    this.sendUDPGreeting(Action.Distribution);
  }

  public Request(): void {
    this.sendUDPGreeting(Action.Request);
  }

  public Close(c: () => void) {
    const udp = new Promise((res, rej) => {
      if (this.udpserver) {
        this.udpserver.Close(res);
      } else {
        res();
      }
    });

    const tcp = new Promise((res, rej) => {
      if (this.tcpserver) {
        this.tcpserver.Close(res);
      } else {
        res();
      }
    });

    Promise.all([udp, tcp]).then(() => c());
  }

  public Created() {
    this.binded = true;
    this.Broadcast();
  }
  // Recieve UDP and TCP dgams, but user's data transfering use TCP connection
  private Receive(data: IMessage) {
    if (this.debug) {
      console.log(`${this.name}: Recived ${data.message} from ${data.IP}`);
    }
    switch (data.message.Action) {
        case Action.Request:
          this.pushToBuffer(data);
          this.newDataRequest!(data.message.NetworkID);
          break;
        case Action.Distribution:
          this.pushToBuffer(data);
          this.newDataDistribution!(data.message.NetworkID);
          break;
        case Action.SendData:
          this.pushToBuffer(data);
          this.gotDataFromTransmition!(
            (data.message as ISendDataMessage).Data,
            (data.message as ISendDataMessage).DBSchemaVersion);
          break;
        case Action.NeedData:
          this.pushToBuffer(data);
          this.newDataDistribution!(data.message.NetworkID);
          break;
      }
   }

  private sendUDPGreeting(action: Action) {
    if (this.debug) {
      console.log(`${this.name}: Sent udp greeting - ${action}`);
    }
    this.udpserver!.SendMulticast({
      Action: action,
      NetworkID: this.settings().NetworkID,
      Type: MessageType.Greeting,
    });
  }

  private Error(err: Error) {
    if (this.debug) {
      console.log(`Server error ${err}`);
    }
  }

  private pushToBuffer(message: IMessage) {
    this.bufferRequests.push(message);
  }

  private popFromBuffer(networkID: string) {
    this.bufferRequests = this.bufferRequests.filter((v) => v.message.NetworkID !== networkID);
  }

}

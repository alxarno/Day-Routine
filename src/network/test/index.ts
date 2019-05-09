import Network from "..";
import { ISettings } from "src/interfaces/settingsStore";
import { SyncCore, BasicAction } from "./sync";

const PORT_TCP_1 = 42816; // FIRST TCP TEST SERVER PORT
const PORT_UDP_1 = 42814; // FIRST UDP TEST SERVER PORT

const PORT_TCP_2 = 43816; // SECOND TCP TEST SERVER PORT
const PORT_UDP_2 = 43814; // SECOND UDP TEST SERVER PORT

// beforeAll(() => {
process.env = {...process.env,  TEST: true};
// window = new Window();
// });

function BasicTest() {
  const settings1 = (): ISettings => {
    return {
      DeadZoneNotifications: false,
      NetworkID: "2228-8889",
      Notifications: false,
      RecieveDataFromUnknow: true,
      UserPass: "1111",
    };
  };

  const settings2 = (): ISettings => {
    return {
      DeadZoneNotifications: false,
      NetworkID: "2228-8009",
      Notifications: false,
      RecieveDataFromUnknow: true,
      UserPass: "1111",
    };
  };

  const network1 = new Network("1.1", settings1, true, PORT_TCP_1, PORT_TCP_2, PORT_UDP_1, PORT_UDP_2);
  const network2 = new Network("1.1", settings2, true, PORT_TCP_2, PORT_TCP_1, PORT_UDP_2, PORT_UDP_1);

  const sync1 = new SyncCore(network1, BasicAction.Request, "Entity 1 ");
  const sync2 = new SyncCore(network2, BasicAction.None,  "Entity 2 ");
}
// beforeAll();
BasicTest();
// console.log(PORT_TCP_1, PORT_UDP_1, PORT_TCP_2, PORT_UDP_2);

import { IStorage } from "src/interfaces/storage";
import { ICache } from "src/interfaces/cache";
import { IOS } from "src/interfaces/os";

export default abstract class CoreModule {
  protected storage?: IStorage;
  protected cash?: ICache;
  protected os?: IOS;

  constructor(props: {[key: string]: any}) {
    if (props.hasOwnProperty("storage")) {
      this.storage = props.storage;
    }
    if (props.hasOwnProperty("cash")) {
      this.cash = props.cash;
    }
    if (props.hasOwnProperty("os")) {
      this.os = props.os;
    }
  }

}

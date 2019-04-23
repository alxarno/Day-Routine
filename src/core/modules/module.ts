import { IStorage } from "src/interfaces/storage";
import { ICache } from "src/interfaces/cache";
import { IOS } from "src/interfaces/os";
import { ISettings, ISettingsStore } from "src/interfaces/settingsStore";

export default abstract class CoreModule {
  protected storage?: IStorage;
  protected cache?: ICache;
  protected os?: IOS;
  protected settingsStorage?: ISettingsStore;
  protected settingsApply?: (s: ISettings) => void;

  constructor(props: {[key: string]: any}) {
    if (props.hasOwnProperty("storage")) {
      this.storage = props.storage;
    }
    if (props.hasOwnProperty("cache")) {
      this.cache = props.cache;
    }
    if (props.hasOwnProperty("os")) {
      this.os = props.os;
    }
    if (props.hasOwnProperty("settings_storage")) {
      this.settingsStorage = props.settings_storage;
    }
    if (props.hasOwnProperty("settings_apply")) {
      this.settingsApply = props.settings_apply;
    }
  }

}

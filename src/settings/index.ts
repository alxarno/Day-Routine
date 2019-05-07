import { ISettingsStore, ISettings } from "src/interfaces/settingsStore";
import { generateNetworkID } from "./methods";

export class SettingsStore implements ISettingsStore {
  private mystorage: Storage;
  private defaults: ISettings;

  constructor() {
    this.mystorage = window.localStorage;
    this.defaults = {
      Notifications: true,
      DeadZoneNotifications: true,
      NetworkID: generateNetworkID(),
      RecieveDataFromUnknow: true,
      UserPass: generateNetworkID(),
    };
  }

  public Get(): ISettings {
    const result = this.mystorage.getItem("settings");
    if (result == null || result === "") {
      this.Put(this.defaults);
      return this.Get();
    }
    return JSON.parse(result);
  }

  public Put(s: ISettings): void {
    this.mystorage.setItem("settings", JSON.stringify(s));
    return;
  }

  public Clear(): void {
    this.mystorage.setItem("settings", "");
    return;
  }

  public UpdateNetworkID(): void {
    const set: ISettings = this.Get();
    set.NetworkID = generateNetworkID();
    this.Put(set);
  }
}

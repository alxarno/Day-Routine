import { ISettingsStore, ISettings } from "src/interfaces/settingsStore";

export class SettingsStoreEmul implements ISettingsStore {
  private mystorage: Map<string, string>;
  private defaults: ISettings;

  constructor() {
    this.mystorage = new Map<string, string>();
    this.defaults = {
      Notifications: true,
    };
  }

  public Get(): ISettings {
    const result = this.mystorage.get("settings");
    if (result == null || result === "") {
      this.Put(this.defaults);
      return this.Get();
    }
    return JSON.parse(result);
  }

  public Put(s: ISettings): void {
    this.mystorage.set("settings", JSON.stringify(s));
    return;
  }

  public Clear(): void {
    this.mystorage.set("settings", "");
    return;
  }
}

import { ISettingsStore, ISettings } from "src/interfaces/settingsStore";

export class SettingsStore implements ISettingsStore {
  private mystorage: Storage;
  private defaults: ISettings;
  // private changeCallbacks: Array<(() => void)>;

  constructor() {
    this.mystorage = window.localStorage;
    // this.changeCallbacks = [];
    this.defaults = {
      Notifications: true,
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
    // this.ExecCallbacks();
    return;
  }

  public Clear(): void {
    this.mystorage.setItem("settings", "");
    return;
  }

  // public SetChangeCallback(f: () => void): void {
  //   this.changeCallbacks.push(f);
  // }

  // public DelChangeCallback(f: () => void): void {
  //   this.changeCallbacks = this.changeCallbacks.filter((v: (() => void)) => {
  //     return (v !== f);
  //   });
  // }

  // private async ExecCallbacks() {
  //   await new Promise((resolve: () => void , reject: () => void) => {
  //     try {
  //       this.changeCallbacks.forEach((v: (() => void)) => {
  //         v ();
  //       });
  //     } catch (e) {
  //       reject();
  //     }
  //     resolve();
  //   });
  // }
}

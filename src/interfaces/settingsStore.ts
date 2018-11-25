export interface ISettings {
  Notifications: boolean;
}

export interface ISettingsStore {
  Get: () => ISettings;
  Put: (s: ISettings) => void;
  Clear: () => void;
}

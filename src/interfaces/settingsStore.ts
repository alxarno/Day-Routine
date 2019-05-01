export interface ISettings {
  Notifications: boolean;
  DeadZoneNotifications: boolean;
  NetworkID: string;
  RecieveDataFromUnknow: boolean;
}

export interface ISettingsStore {
  Get: () => ISettings;
  Put: (s: ISettings) => void;
  Clear: () => void;
  UpdateNetworkID: () => void;
  // SetChangeCallback: (f: () => void) => void;
  // DelChangeCallback: (f: () => void) => void;
}

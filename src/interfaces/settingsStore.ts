export interface ISettings {
  Notifications: boolean;
  DeadZoneNotifications: boolean;
  UsersKey: string;
}

export interface ISettingsStore {
  Get: () => ISettings;
  Put: (s: ISettings) => void;
  Clear: () => void;
  // SetChangeCallback: (f: () => void) => void;
  // DelChangeCallback: (f: () => void) => void;
}

export interface ICache {
  Get: () => any;
  Set: (body: any) => void;
  Clear: () => void;
}

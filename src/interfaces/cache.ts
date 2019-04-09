export interface ICache {
  Get: () => any;
  GetYesterday: () => any;
  Set: (body: any) => void;
  Clear: () => void;
}

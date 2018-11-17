export interface IStorageKernel {
  Get: (table: string, data?: any) => Promise<any>;
  Insert: (table: string, data: any) => Promise<number>;
  Update: (table: string, data: any) => Promise<void>;
  Delete: (table: string, data: any) => Promise<void>;
  TableCreate: (name: string, schema: {[key: string]: Object}) => Promise<any>;
}

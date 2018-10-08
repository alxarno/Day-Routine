export interface IStorageKernel{
  CreateTable:Function;
  DropTable:Function;

  Get:Function;
  Insert:Function;
  Update:Function;
  Delete:Function;
}
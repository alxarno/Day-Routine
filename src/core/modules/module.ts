import { IStorage } from 'src/interfaces/storage';

export default abstract class CoreModule{
  protected storage:IStorage

  constructor(storage:IStorage){
    this.storage = storage
  }

}
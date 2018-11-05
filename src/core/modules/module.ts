import { IStorage } from 'src/interfaces/storage';
import { ICash } from 'src/interfaces/cash';

export default abstract class CoreModule{
  protected storage:IStorage
  protected cash:ICash

  constructor(props:{[key:string]:any}){
    if(props.hasOwnProperty('storage')){
      this.storage = props['storage']
    }
    if(props.hasOwnProperty('cash')){
      this.cash = props['cash']
    }
  }

}
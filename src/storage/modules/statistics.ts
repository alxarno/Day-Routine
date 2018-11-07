import {IStatisticsStorage} from '../../interfaces/storage'
import {IStorageKernel} from '../../interfaces/storageKernel'
import StorageModule from './module';
import IStatistics from 'src/models/statistics';

export class Statistics extends StorageModule implements IStatisticsStorage {
  
  constructor(kernel:IStorageKernel,
       schema:StorageSchema.ISchema,
       changeCallback:Function){
    super(kernel, schema, changeCallback)
  }

  private clearSpoiled(st:IStatistics):IStatistics{
    let now:Date = new Date
    let daysGone:number = Math.round((now.getTime()-st.lastUpdate.getTime())/(1000*60*60*24)); //Days delta
    st.spent = [...st.spent.slice(daysGone), ...Array.from({length: daysGone}, ()=>0)] // New n values 
    return st
  }

  async Get(){
    let rows:{[key:number]:any} = await this.kernel.Get(this.schema.name)
    if(Object.keys(rows).length==0) return [];
    let crows:Array<any> = Object.keys(rows).map((v,i) => rows[i]);
    let units:Array<IStatistics> = crows.map((el:IStatistics)=>this.schema.Deserialization(el))
    return units
  }

  async Add(data:{routineID:number, hours:number}){
    let st:IStatistics;
    let rows:{[key:number]:any} 
    // console.log(rows)
    rows = await this.kernel.Get(this.schema.name, {routineID:data.routineID})
    
    if(Object.keys(rows).length==0){
      st = {
        ID:-1,
        routineID:data.routineID,
        lastUpdate: new Date(),
        spent: [0,0,0,0,0,0,0]
      }
    }else{
      let crows:Array<any> = Object.keys(rows).map((v,i) => rows[i]);
      let units:Array<IStatistics> = crows.map((el:IStatistics)=>this.schema.Deserialization(el))
      st=units[0]
    }
    this.clearSpoiled(st)
    st.spent[6] +=data.hours;
    if(st.ID == -1){
      this.kernel.Insert(this.schema.name, this.schema.Serialization(st))
      return
    }
    this.kernel.Update(this.schema.name, this.schema.Serialization(st))
  }


  Delete(data:{routineID:number}){
    this.kernel.Delete(this.schema.name, data)
  }

}
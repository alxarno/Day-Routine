import {IStatisticsStorage} from "../../interfaces/storage";
import {IStorageKernel} from "../../interfaces/storageKernel";
import StorageModule from "./module";
import IStatistics from "src/models/statistics";

export class Statistics extends StorageModule<IStatistics> implements IStatisticsStorage {

  constructor(kernel: IStorageKernel,
              schema: StorageSchema.ISchema,
              changeCallback: () => void) {
     super(kernel, schema, changeCallback);
  }

  public async Add(data: {routineID: number, hours: number}) {
    let st: IStatistics;
    let rows: {[key: number]: any};
    // console.log(rows)
    rows = await this.kernel.Get(this.schema.name, {routineID: data.routineID});

    if (Object.keys(rows).length === 0) {
      st = {
        ID: -1,
        routineID: data.routineID,
        lastUpdate: new Date(),
        spent: [0, 0, 0, 0, 0, 0, 0],
      };
    } else {
      const crows: any[] = Object.keys(rows).map((v, i) => rows[i]);
      const units: IStatistics[] = crows.map((el: IStatistics) => this.schema.Deserialization(el));
      st = units[0];
    }
    this.clearSpoiled(st);
    st.spent[6] += data.hours;
    if (st.ID === -1) {
      this.kernel.Insert(this.schema.name, this.schema.Serialization(st));
      return;
    }
    this.kernel.Update(this.schema.name, this.schema.Serialization(st));
  }

  private clearSpoiled(st: IStatistics): IStatistics {
    const now: Date = new Date();
    const daysGone: number = Math.round(
      (now.getTime() - st.lastUpdate.getTime()) / (1000 * 60 * 60 * 24)); // Days delta
    st.spent = [...st.spent.slice(daysGone), ...Array.from({length: daysGone}, () => 0)]; // New n values
    return st;
  }

}

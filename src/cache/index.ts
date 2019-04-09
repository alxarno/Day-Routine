import {ICache} from "src/interfaces/cache";
import { INowTask } from "src/models/now.tasks";

interface IPacket {
  date: string;
  body: Array<INowTask | null>;
}

export class CashLocalStorage implements ICache {
public mystorage: Storage;

constructor() {
  this.mystorage = window.localStorage;
}

public Set(body: Array<INowTask | null>) {
  const data: IPacket = {
    date: this.getDate(),
    body,
  };
  this.mystorage.setItem("cash", JSON.stringify(data));
}

public Get(): Array<INowTask | null> {
  const result = this.mystorage.getItem("cash");
  if (result == null || result === "") {
    this.Clear();
    return this.Get();
  }
  const data: IPacket = JSON.parse(result);
  if (data.date !== this.getDate()) {
    this.Clear();
    return this.Get();
  } else {
    return data.body;
  }
}

public Clear() {
   this.Set([]);
}

private getDate(): string {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return year + "" + month + "" + day;
}
}

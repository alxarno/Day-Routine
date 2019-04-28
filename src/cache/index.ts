import {ICache} from "src/interfaces/cache";
import { INowTask } from "src/models/now.tasks";

const cacheName = "cache_";

export class CacheLocalStorage implements ICache {
public mystorage: Storage;

constructor() {
  this.mystorage = window.localStorage;
}

public Set(body: Array<INowTask | null>) {
  this.mystorage.setItem(this.getDateName(new Date()), JSON.stringify(body));
}

public Get(): Array<INowTask | null> {
  const result = this.mystorage.getItem(this.getDateName(new Date()));
  if (result == null || result === "") {
    this.Clear();
    return this.Get();
  }
  return JSON.parse(result);
}

public GetYesterday(): Array<INowTask | null> {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const result = this.mystorage.getItem(this.getDateName(d));
  if (result == null || result === "") {
    return [];
  } else {
    return JSON.parse(result);
  }
}

// Clear today's caching schedule
public Clear() {
   this.Set([]);
}

private getDateName(dateObj: Date): string {
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return cacheName + year + "_" + month + "_" + day;
}
}

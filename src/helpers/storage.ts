import log from "./logger";
import { get, set, clear, createStore } from "idb-keyval";

const customStore = createStore("lazy-trainer-db", "lazy-trainer-store");

export async function saveStorage(name: string, data: any) {
  try {
    const s = JSON.stringify(data);
    localStorage.setItem(name, s);
    await set(name, s, customStore);
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

export async function getStorage<T>(name: string): Promise<T | undefined> {
  try {
    let data: string | null | undefined = localStorage.getItem(name);
    if (!data) {
      data = await get(name, customStore);
      if (data) {
        saveStorage(name, data);
      }
    }
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    log(JSON.stringify(error), "error");
    await clearStorage();
  }
  return undefined;
}

export async function clearStorage() {
  try {
    localStorage.clear();
    await clear(customStore);
  } catch (error) {
    log(JSON.stringify(error), "error");
  }
}

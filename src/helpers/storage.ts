import log from "./logger";

export function saveStorage(name: string, data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem(name, s);
}

export function getStorage<T>(name: string): T | undefined {
  const data = localStorage.getItem(name);
  try {
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    log(JSON.stringify(error), "error");
    clearStorage();
  }
  return undefined;
}

export function clearStorage() {
  localStorage.clear();
}

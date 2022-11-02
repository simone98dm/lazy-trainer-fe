import localForage from "localforage";

export async function saveStorage(name: string, data: any) {
  try {
    await localForage.setItem(name, data);
  } catch (err) {
    console.log(err);
  }
}

export async function getStorage<T>(name: string): Promise<T | undefined> {
  try {
    const data = await localForage.getItem<T>(name);
    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
  return undefined;
}

import log from './logger';

export async function saveStorage(name: string, data: unknown) {
  try {
    const s = JSON.stringify(data);
    localStorage.setItem(name, s);
  } catch (error) {
    log(JSON.stringify(error), 'error');
  }
}

export async function getStorage<T>(name: string): Promise<T | undefined> {
  try {
    const data: string | null | undefined = localStorage.getItem(name);
    if (!data) {
      if (data) {
        const d = JSON.parse(data);
        await saveStorage(name, d);
      }
    }
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (error) {
    log(JSON.stringify(error), 'error');
    await clearStorage();
  }
  return undefined;
}

export async function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    log(JSON.stringify(error), 'error');
  }
}

export function saveStorage(name: string, data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem(name, s);
}

export function getStorage<T>(name: string): T | undefined {
  const data = localStorage.getItem(name);
  if (!data) {
    return undefined;
  }
  return JSON.parse(data);
}

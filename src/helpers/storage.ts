import { IPlan } from "../models/Plan";

export function saveStorage(data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem("_plan", s);
}

export function getStorage(): IPlan | undefined {
  const data = localStorage.getItem("_plan");
  if (!data) {
    return undefined;
  }
  return JSON.parse(data);
}

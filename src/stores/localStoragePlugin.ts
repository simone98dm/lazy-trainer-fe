import { IPlan } from "./../models/Plan";

export function save(data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem("_plan", s);
}

export function retrieve(): IPlan | undefined {
  const data = localStorage.getItem("_plan");
  if (!data) {
    return undefined;
  }
  return JSON.parse(data);
}

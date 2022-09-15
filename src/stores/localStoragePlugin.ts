import { IPlan } from "./../models/Plan";

export function save(data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem("_plan", s);
}

export function retrieve(): IPlan | null {
  const data = localStorage.getItem("_plan");
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

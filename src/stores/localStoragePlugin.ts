import { IPlan } from "./../models/Plan";

export function save(data: any) {
  const s = JSON.stringify(data);
  localStorage.setItem("_plan", s);
}

export function retrieve(): IPlan {
  const data = localStorage.getItem("_plan");
  return JSON.parse(data || "");
}

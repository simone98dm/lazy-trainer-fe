import { Activity } from "./Activity";

export interface Session {
  dayOfWeek: number;
  id: string;
  activities: Activity[];
}

export interface CustomSession {
  description: string;
  name: string;
  dayOfWeek: number;
  id: string;
  activities: Activity[];
}

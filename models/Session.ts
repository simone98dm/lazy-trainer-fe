import { IActivity } from "./Activity";

export interface ISession {
  dayOfWeek: number;
  id: string;
  activities: IActivity[];
}

export interface ICustomSession {
  description: string;
  name: string;
  dayOfWeek: number;
  id: string;
  activities: IActivity[];
}

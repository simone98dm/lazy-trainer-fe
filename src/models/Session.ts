import { IActivity } from "./Activity";

export interface ISession {
  dayOfWeek: number;
  id: string;
  activities: IActivity[];
}

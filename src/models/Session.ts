import { IActivity } from "./Activity";

export interface ISession {
  dayOfWeek: number;
  activities: IActivity[];
}

import { IActivity } from "../models/Activity";

export type TimerActivity =
  | {
      firstActivity: IActivity | undefined;
      secondActivity: IActivity | undefined;
    }
  | undefined;

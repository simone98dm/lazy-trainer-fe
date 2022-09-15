import { IActivity } from "../models/Activity";

export type Act =
  | {
      firstActivity: IActivity | undefined;
      secondActivity: IActivity | undefined;
    }
  | undefined;

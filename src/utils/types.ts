import { IActivity } from "../models/Activity";

export type TimerActivity =
  | {
      firstActivity: IActivity | undefined;
      secondActivity: IActivity | undefined;
    }
  | undefined;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

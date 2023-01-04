import { IActivity } from "../models/Activity";
import { DataAction } from "./enum";

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

export type SettingStorage = {
  audioDisabled: boolean;
  easyMode: boolean;
};

export type logOptions = (message: string, type?: "info" | "error" | "warn") => void;

export type UserConfigurations = {
  audioDisabled: boolean;
  easyMode: boolean;
};

export type TrainerRequest = {
  data?: IActivity | SessionRequest | OrderRequest[];
  activityId?: string;
  sessionId?: string;
  planId?: string;
  action: DataAction;
};

export type SessionRequest = {
  id: string;
  dayOfWeek: number;
  warmup?: IActivity[];
};

export type OrderRequest = {
  id: string;
  order: number;
};

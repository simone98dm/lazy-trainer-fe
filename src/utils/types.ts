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

export type SettingStorage = {
  audioDisabled: boolean;
  easyMode: boolean;
};

export type logOptions = (
  message: string,
  type?: "info" | "error" | "warn"
) => void;

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  readAt: string;
  type: number;
  isRead: boolean;
  formattedDate: string;
};

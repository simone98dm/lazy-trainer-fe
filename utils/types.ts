import type { Activity } from "~/models/Activity";
import { DataAction } from "./enum";

export type TimerActivity = {
  firstActivity: Activity | null;
  secondActivity: Activity | null;
} | null;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type SettingStorage = {
  audioDisabled: boolean;
  easyMode: boolean;
};

export type LogOptions = (message: string, type?: "info" | "error" | "warn") => void;

export type UserConfigurations = {
  audioDisabled: boolean;
  easyMode: boolean;
  darkMode: boolean;
};

export type TrainerRequest = {
  data?: Activity | SessionRequest | OrderRequest[];
  activityId?: string;
  sessionId?: string;
  planId?: string;
  action: DataAction;
};

export type SessionRequest = {
  id: string;
  dayOfWeek: number;
  warmup?: Activity[];
};

export type OrderRequest = {
  id: string;
  order_index: number;
};

export type CardSizes = "none" | "small" | "medium" | "large";
export type ButtonSizes = "none" | "small" | "medium" | "large";
export type MaterialIconSizes = "small" | "medium" | "large";
export type ButtonVariants = "smooth" | "circular" | "clean";
export type MaterialIcons =
  | "house"
  | "arrow_back"
  | "dashboard"
  | "groups"
  | "settings"
  | "close"
  | "play_arrow"
  | "event_busy"
  | "self_improvement"
  | "exposure_plus_1"
  | "remove"
  | "save"
  | "replay"
  | "add"
  | "edit"
  | "stop_circle"
  | "play_circle"
  | "skip_next"
  | "login"
  | "inventory"
  | "account_circle"
  | "verified_user"
  | "cloud_sync"
  | "logout"
  | "delete"
  | "arrow_forward"
  | "more_vert"
  | "check"
  | "timer"
  | "content_copy"
  | "cancel"
  | "person";
export type Color =
  | "primary"
  | "light"
  | "dark"
  | "danger"
  | "warning"
  | "success"
  | "trasparent"
  | "purple";
export type SvgAvailableIcons =
  | "working_out_re_nhkg"
  | "fitness_tracker_3033"
  | "healthy_habit_m1a9"
  | "indoor_bike_pwa4"
  | "personal_trainer_re_cnua"
  | "pilates_ftsd"
  | "runner_start_x-0-uu"
  | "fitness_stats_sht6"
  | "github"
  | "linkedin";

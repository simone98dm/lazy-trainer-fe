import { Role } from "./enum";
import { SvgAvailableIcons } from "./types";

export const FULL_DASH_ARRAY = 283;
export const WARNING_THRESHOLD = 10;
export const ALERT_THRESHOLD = 5;
export const MAX_ACTIVITY_FORM = 10;

export const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "green",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

export const RoleName: { [role in Role]: string } = {
  [Role.NORMAL]: "Normal",
  [Role.TRAINER]: "Trainer",
  [Role.SELFMADE]: "Self Made",
};

export const GaCustomEvents = {
  LOGIN: "login",
  LOGOUT: "logout",
  CLICK: "click",
  RUN_ACTIVITY: "run_workout",
  ADD_ACTIVITY: "add_activity",
  REMOVE_ACTIVITY: "remove_activity",
  UPDATE_ACTIVITY: "update_activity",
  ADD_SESSION: "add_session",
  REMOVE_SESSION: "remove_session",
  UPDATE_SESSION: "update_session",
  UPDATE_SETTINGS: "update_settings",
  PROFILE_SYNC: "profile_sync",
};

export const icons: SvgAvailableIcons[] = [
  "working_out_re_nhkg",
  "fitness_tracker_3033",
  "healthy_habit_m1a9",
  "indoor_bike_pwa4",
  "personal_trainer_re_cnua",
  "pilates_ftsd",
  "runner_start_x-0-uu",
  "fitness_stats_sht6",
];

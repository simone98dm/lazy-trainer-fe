import { Role } from "./enum";

export const FULL_DASH_ARRAY = 283;
export const WARNING_THRESHOLD = 10;
export const ALERT_THRESHOLD = 5;
export const baseUrl = "";
export const MAX_ACTIVITY_FORM = 10;

export const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
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

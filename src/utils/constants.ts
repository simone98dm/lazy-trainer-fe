import { Role } from "./enum";
export const FULL_DASH_ARRAY = 283;
export const WARNING_THRESHOLD = 10;
export const ALERT_THRESHOLD = 5;

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

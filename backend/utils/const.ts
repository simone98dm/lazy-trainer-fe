export const uri = process.env.MONGODB_URI || "";
export const SECRET_KEY = process.env.SECRET_KEY || "";
export const DB_NAME = "lazyTrainerDb";

export enum DbTable {
  USERS = "users",
  PLANS = "plans",
  SESSIONS = "sessions",
  ACTIVITIES = "activities",
  CONFIGS = "configs",
  STATS = "stats",
}

export enum LogLevel {
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
  DEBUG = "debug",
}

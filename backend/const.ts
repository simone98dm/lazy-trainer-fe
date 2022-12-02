export const uri = process.env.MONGODB_URI || "";
export const SECRET_KEY = process.env.SECRET_KEY || "";
export const DB_NAME = "lazyTrainerDb";

export enum DbTable {
  USERS = "users",
  PLANS = "plans",
  SESSIONS = "sessions",
  ACTIVITIES = "activities",
  CONFIGS = "configs",
}

export enum LogLevel {
  INFO = "Info",
  ERROR = "Error",
  WARNING = "Warning",
  DEBUG = "Debug",
}

export function log(
  message: string,
  level: LogLevel = LogLevel.INFO,
  ...args: any[]
) {
  let logObject: any = {};

  switch (level) {
    case LogLevel.INFO:
      logObject = { message: "🌐: " + message };
      break;
    case LogLevel.ERROR:
      logObject = { message: "🚨: " + message };
      break;
    case LogLevel.WARNING:
      logObject = { message: "❗️: " + message };
      break;
    default:
      logObject = { message: "☂️: " + message };
      break;
  }

  if (process.env.DEBUG) {
    logObject = {
      ...logObject,
      level,
      args: JSON.stringify(args),
    };
  }

  console.log(logObject);
}

export enum LogLevel {
  INFO = "Info",
  ERROR = "Error",
  WARNING = "Warning",
  DEBUG = "Debug",
}

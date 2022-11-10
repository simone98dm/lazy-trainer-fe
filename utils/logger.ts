import { Logtail } from "@logtail/node";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "");

export function log(
  message: string,
  level: LogLevel = LogLevel.INFO,
  ...args: any[]
) {
  let logObject: any = JSON.stringify({
    message,
    args: JSON.stringify(args),
  });

  switch (level) {
    case LogLevel.INFO:
      logtail.info(logObject);
      break;
    case LogLevel.ERROR:
      logtail.error(logObject);
      break;
    case LogLevel.WARNING:
      logtail.warn(logObject);
      break;
    default:
      logtail.log(logObject);
      break;
  }
}

export enum LogLevel {
  INFO = "Info",
  ERROR = "Error",
  WARNING = "Warning",
  DEBUG = "Debug",
}

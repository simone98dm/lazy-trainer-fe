import { Logtail } from "@logtail/node";
import { LogLevel } from "../const";
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "");

function log(
  message: unknown,
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

export default {
  warn: (message: unknown, ...args: any[]) =>
    log(message, LogLevel.WARNING, ...args),
  error: (message: unknown, ...args: any[]) =>
    log(message, LogLevel.ERROR, ...args),
  info: (message: unknown, ...args: any[]) =>
    log(message, LogLevel.INFO, ...args),
  log: (message: unknown, ...args: any[]) =>
    log(message, LogLevel.DEBUG, ...args),
};

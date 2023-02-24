import { LogLevel } from "../index";
import { Environment } from "../utils/const";

function log(message: unknown, level: LogLevel = LogLevel.INFO, ...args: unknown[]) {
  if (
    process.env.DEPLOY_ENV === Environment.PROD &&
    (LogLevel.ERROR === level || LogLevel.WARNING === level)
  ) {
    return;
  }

  const logObject: string = JSON.stringify({
    message,
    args: JSON.stringify(args),
  });

  switch (level) {
    case LogLevel.INFO:
      console.info(logObject);
      break;
    case LogLevel.ERROR:
      console.error(logObject);
      break;
    case LogLevel.WARNING:
      console.warn(logObject);
      break;
    default:
      console.log(logObject);
      break;
  }
}

export const logger = {
  warn: (message: unknown, ...args: unknown[]) => log(message, LogLevel.WARNING, ...args),
  error: (message: unknown, ...args: unknown[]) => log(message, LogLevel.ERROR, ...args),
  info: (message: unknown, ...args: unknown[]) => log(message, LogLevel.INFO, ...args),
  debug: (message: unknown, ...args: unknown[]) => log(message, LogLevel.DEBUG, ...args),
};

import { Browser } from "@logtail/js";

export default function log(message: string, type: "info" | "warn" | "error") {
  switch (type) {
    case "error":
      console.error(message);
      break;
    case "warn":
      console.warn(message);
      break;
    case "info":
      console.info(message);
      break;
    default:
      console.log(message);
      break;
  }
}

export const logTailLogger = () => {
  const logger = new Browser(import.meta.env.VITE_LOGTAIL_API_KEY);
  return (message: string, type: "info" | "warn" | "error") => {
    switch (type) {
      case "error":
        logger.error(message);
        break;
      case "warn":
        logger.warn(message);
        break;
      case "info":
        logger.info(message);
        break;
      default:
        logger.log(message);
        break;
    }
  };
};

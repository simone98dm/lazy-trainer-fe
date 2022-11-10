export default function log(message: string, type: "info" | "warn" | "error") {
  const log = customLogger();
  log(message, type);
}

export const customLogger = () => {
  const logger = console;
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

import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getUserConfiguration,
  internalServerError,
  logger,
  notFound,
  ok,
  saveConfiguration,
  validateUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id } = validateUser(request);
    if (request.method === "GET") {
      const data = await getUserConfiguration(id);
      return ok(response, data);
    } else if (request.method === "POST") {
      const result = await saveConfiguration(id, request.body);
      if (!result) {
        logger.warn("Unable to save configurations", {
          id,
          options: request.body,
        });
        return notFound(response, "User not found");
      }

      return ok(response);
    }
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return internalServerError(response, "something went wrong");
  }
};

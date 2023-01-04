import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import { getTrainer, getUserConfiguration, saveConfiguration } from "../../backend/helpers/user";
import { commonResponse } from "../../backend/utils/http";
import logger from "../../backend/utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id } = validateUser(request);
    if (request.method === "GET") {
      const data = await getUserConfiguration(id);
      return commonResponse.ok(response, data);
    } else if (request.method === "POST") {
      const result = await saveConfiguration(id, request.body);
      if (!result) {
        logger.warn("Unable to save configurations", {
          id,
          options: request.body,
        });
        return commonResponse.notFound(response, "User not found");
      }

      return commonResponse.ok(response);
    }
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return commonResponse.internalServerError(response, "something went wrong");
  }
};

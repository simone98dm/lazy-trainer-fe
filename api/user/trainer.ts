import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import { getMappedPlan } from "../../backend/helpers/user";
import { commonResponse } from "../../backend/utils/http";
import logger from "../../backend/utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    validateUser(request);

    const { id } = request.body;
    const result = getMappedPlan(id);

    if (result) {
      return commonResponse.ok(response, result);
    } else {
      logger.warn("Trainer try to look for user plan", {
        userId: id,
      });
      return commonResponse.notFound(response, "plan not found");
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

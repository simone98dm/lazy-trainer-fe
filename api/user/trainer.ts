import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getMappedPlan,
  internalServerError,
  logger,
  notFound,
  ok,
  validateUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    validateUser(request);

    const { id } = request.body;
    const result = await getMappedPlan({ id: id });

    if (result) {
      return ok(response, result);
    } else {
      logger.warn("Trainer try to look for user plan", {
        userId: id,
      });
      return notFound(response, "plan not found");
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

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
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }

    const { id } = validateUser(request);

    const result = await getMappedPlan({ ownerId: id });

    if (result) {
      return ok(response, result);
    } else {
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

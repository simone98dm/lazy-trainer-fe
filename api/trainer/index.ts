import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import logger from "../../backend/utils/logger";
import { commonResponse } from "../../backend/utils/http";
import { getMappedPlan } from "../../backend/helpers/user";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }

    const { id } = validateUser(request);

    const result = await getMappedPlan({ ownerId: id });

    if (result) {
      return commonResponse.ok(response, result);
    } else {
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

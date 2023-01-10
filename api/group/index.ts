import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  validateUser,
  logger,
  getTrainerPlans,
  badRequest,
  internalServerError,
  ok,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const isValid = validateUser(request);
    const { id } = request.body;
    if (!id) {
      return badRequest(response, "id not provided");
    }

    const plans = await getTrainerPlans(isValid.id);

    logger.info("Trainer request plans", {
      trainer: isValid,
      groupId: id,
    });
    return ok(response, plans);
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return internalServerError(response, "something went wrong");
  }
};

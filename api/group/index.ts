import type { VercelRequest, VercelResponse } from "@vercel/node";
import { commonResponse, validateUser, logger, getTrainerPlans } from "../../backend";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const isValid = validateUser(request);
    const { id } = request.body;
    if (!id) {
      return commonResponse.badRequest(response, "id not provided");
    }

    const plans = await getTrainerPlans(isValid.id);

    logger.info("Trainer request plans", {
      trainer: isValid,
      groupId: id,
    });
    return commonResponse.ok(response, plans);
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return commonResponse.internalServerError(response, "something went wrong");
  }
};

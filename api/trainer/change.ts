import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  internalServerError,
  logger,
  ok,
  requestActivityChange,
  validateUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }
    const { activityId } = request.body;

    const isValid = validateUser(request);
    const requestStatus = await requestActivityChange(activityId);
    if (!requestStatus.ok) {
      throw new Error(`unable to request change for activity: ${activityId}`);
    }

    logger.info("User request change", {
      userId: isValid.id,
      activityId,
    });
    return ok(response);
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return internalServerError(response, "something went wrong");
  }
};

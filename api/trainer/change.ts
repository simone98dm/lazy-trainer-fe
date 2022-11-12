import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import { requestActivityChange } from "../../backend/helpers/user";
import { commonResponse } from "../../backend/utils/http";
import logger from "../../backend/utils/logger";

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
    return commonResponse.ok(response);
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return commonResponse.internalServerError(response, "something went wrong");
  }
};

import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  commonResponse,
  logger,
  Role,
  saveChanges,
  validateUser,
  verifyUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== "POST") {
    return commonResponse.badRequest(response);
  }

  try {
    const { id, role } = validateUser(request);

    if (role === Role.NORMAL) {
      throw new Error("User is not a trainer");
    }

    const exist = await verifyUser(id);
    if (!exist) {
      throw new Error("User don't exist");
    }

    const { activityId, sessionId, planId, action, data } = request.body;

    await saveChanges(action, sessionId, activityId, planId, data);

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

import { DataAction, Role } from "./../../src/utils/enum";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import {
  createActivity,
  deleteActivity,
  sortActivities,
  updateActivity,
} from "../../backend/helpers/activity";
import { createSession, deleteSession, updateSession } from "../../backend/helpers/session";
import { verifyUser } from "../../backend/helpers/user";
import logger from "../../backend/utils/logger";
import { commonResponse } from "../../backend/utils/http";

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method !== "POST") {
    return commonResponse.badRequest(response);
  }

  try {
    const { id, name, role } = validateUser(request);

    if (role === Role.NORMAL) {
      throw new Error("User is not a trainer");
    }

    const exist = await verifyUser(id);
    if (!exist) {
      throw new Error("User don't exist");
    }

    const { activityId, sessionId, planId, action, data } = request.body;
    switch (action) {
      case DataAction.SESSION_CREATE:
        await createSession(planId, data);
        break;
      case DataAction.SESSION_DELETE:
        await deleteSession(sessionId);
        break;
      case DataAction.SESSION_UPDATE:
        await updateSession(sessionId, data);
        break;
      case DataAction.ACTIVITY_CREATE:
        await createActivity(sessionId, data);
        break;
      case DataAction.ACTIVITY_DELETE:
        await deleteActivity(activityId);
        break;
      case DataAction.ACTIVITY_UPDATE:
        await updateActivity(activityId, data);
        break;
      case DataAction.ACTIVITY_SORT:
        await sortActivities(data);
        break;
      default:
        throw new Error("action not recognized");
    }

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

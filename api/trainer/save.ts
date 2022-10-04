import { Role } from "./../../src/utils/enum";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyToken } from "../all";
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from "./utils/activity";
import { createSession, deleteSession, updateSession } from "./utils/session";

enum DataAction {
  SESSION_DELETE,
  SESSION_UPDATE,
  SESSION_CREATE,
  ACTIVITY_DELETE,
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const body = request.body;
  if (!body) {
    response.status(400).end({ error: "something went wrong" });
  }

  try {
    const bearer = request.headers.authorization?.split(" ")[1];
    const decoded = verifyToken(bearer as string);

    if (decoded?.role === Role.NORMAL) {
      response.status(403).end();
    }

    const { activityId, sessionId, planId, action, data } = body;

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
      default:
        throw new Error("action not recognized");
    }

    response.status(200).end();
  } catch (error) {
    console.error(error);
  }

  response.status(500).end({ error: "something went wrong" });
};

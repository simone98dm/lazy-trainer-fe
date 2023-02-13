import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getStats,
  internalServerError,
  logger,
  markSessionAsComplete,
  ok,
  validateUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id } = validateUser(request);
    if (request.method === "POST") {
      const { sessionId } = request.body;
      await markSessionAsComplete(id, sessionId);
      return ok(response);
    } else if (request.method === "GET") {
      const stats = await getStats(id);
      return ok(response, stats);
    } else {
      throw new Error("Method not allowed");
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

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { markSessionAsComplete } from "../../backend/helpers/session";
import { validateUser } from "../../backend/helpers/token";
import { getStats } from "../../backend/helpers/user";
import { commonResponse } from "../../backend/utils/http";
import logger from "../../backend/utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id } = validateUser(request);
    if (request.method === "POST") {
      const { sessionId } = request.body;
      await markSessionAsComplete(id, sessionId);
      return commonResponse.ok(response);
    } else if (request.method === "GET") {
      const stats = await getStats(id);
      return commonResponse.ok(response, stats);
    } else {
      throw new Error("Method not allowed");
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

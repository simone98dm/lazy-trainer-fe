import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getTrainer,
  internalServerError,
  logger,
  notFound,
  ok,
  validateUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }

    validateUser(request);
    const trainerId: string = request.query.user as string;

    const result = await getTrainer(trainerId);

    if (!result) {
      logger.warn("Trainer not found", { trainerId });
      return notFound(response, "trainer not found");
    }

    return ok(response, {
      id: result.id,
      name: result.name,
    });
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return internalServerError(response, {
      error: "something went wrong",
    });
  }
};

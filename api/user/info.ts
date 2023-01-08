import type { VercelRequest, VercelResponse } from "@vercel/node";
import { commonResponse, getTrainer, logger, validateUser } from "../../backend";

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
      return commonResponse.notFound(response, "trainer not found");
    }

    return commonResponse.ok(response, {
      id: result.id,
      name: result.name,
    });
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return commonResponse.internalServerError(response, {
      error: "something went wrong",
    });
  }
};

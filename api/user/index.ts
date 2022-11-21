import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateUser } from "../../backend/helpers/token";
import { getTrainer } from "../../backend/helpers/user";
import { commonResponse } from "../../backend/utils/http";
import logger from "../../backend/utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id, name, role } = validateUser(request);
    if (request.method === "GET") {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const result = await client
        .db(DB_NAME)
        .collection<Config>(DbTable.USERS)
        .findOne({ id: id });

      if (!result) {
        log("unable to retrieve configurations", LogLevel.WARNING, { id });
        return response.status(200).send({
          audioDisabled: false,
          easyMode: false,
        });
      }
      const data = JSON.parse(result.configurations);
      return response.status(200).send(data);
    } else if (request.method === "POST") {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const { audioDisabled, easyMode } = request.body;

      const configurations = JSON.stringify({ audioDisabled, easyMode });

      const result = await client
        .db(DB_NAME)
        .collection<Config>(DbTable.USERS)
        .findOneAndUpdate({ id: id }, { $set: { configurations } });

      if (!result) {
        log("Trainer not found", LogLevel.WARNING, { id });
        return response.status(404).json({ error: "not found" });
      }

      return response.status(200).end();
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
    return commonResponse.internalServerError(response, "something went wrong");
  }
};

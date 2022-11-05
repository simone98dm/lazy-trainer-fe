import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DbTable, DB_NAME } from "../../utils/const";
import { connectToDatabase } from "../../utils/db";
import { log, LogLevel } from "../../utils/logger";
import { validateUser } from "../../utils/token";
import { User } from "../../utils/types";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }

    const isValid = validateUser(request);
    const client = await connectToDatabase();
    if (!client) {
      throw new Error("mongoClient is null");
    }

    const trainerId: string = request.query.user as string;

    const result = await client
      .db(DB_NAME)
      .collection<User>(DbTable.USERS)
      .findOne({ id: trainerId });

    if (!result) {
      log("Trainer not found", LogLevel.WARNING, { trainerId });
      return response.status(404).json({ error: "not found" });
    }
    return response.status(200).send({
      id: result.id,
      name: result.name,
    });
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).json({ error: "something went wrong" });
  }
};

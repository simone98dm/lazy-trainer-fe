import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { DbTable, DB_NAME } from "../../utils/const";
import { Plan } from "../../utils/types";
import { log, LogLevel } from "../../utils/logger";
import { validateUser } from "../../utils/token";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const isValid = validateUser(request);

    const client = await connectToDatabase();
    if (!client) {
      throw new Error("mongoClient is null");
    }

    const { id } = request.body;

    const plans = await client
      .db(DB_NAME)
      .collection<Plan>(DbTable.PLANS)
      .find({ trainerId: id })
      .toArray();

    log("Trainer request plans", LogLevel.INFO, {
      trainer: isValid,
      groupId: id,
    });
    return response.status(200).json(plans);
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).json({ error: "something went wrong" });
  }
};

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DbTable, DB_NAME } from "../../utils/const";
import { connectToDatabase } from "../../utils/db";
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

    const { activityId } = request.body;

    await client
      .db(DB_NAME)
      .collection(DbTable.ACTIVITIES)
      .findOneAndUpdate({ id: activityId }, { $set: { requestChange: true } });

    log("User request change", LogLevel.INFO, {
      userId: isValid.id,
      activityId,
    });

    return response.status(200).end();
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).send({ error: "something went wrong" });
  }
};

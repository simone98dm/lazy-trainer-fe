import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { validateUser } from "../../utils/token";
import { DbTable, DB_NAME } from "../../utils/const";
import { mapRawToPlans } from "../../utils/helper";
import { Activity, Plan, Session } from "../../utils/types";
import { log, LogLevel } from "../../utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      throw new Error("Method not allowed");
    }

    const { id } = validateUser(request);

    const client = await connectToDatabase();
    if (!client) {
      throw new Error("mongoClient is null");
    }

    const db = client.db(DB_NAME);

    const plan = await db
      .collection<Plan>(DbTable.PLANS)
      .findOne({ ownerId: id });

    if (plan) {
      const sessions = await db
        .collection<Session>(DbTable.SESSIONS)
        .find({ planId: plan?.id })
        .toArray();

      const sessionIds = sessions.map((session) => session.id);
      const activities = await db
        .collection<Activity>(DbTable.ACTIVITIES)
        .find({ sessionId: { $in: sessionIds } })
        .toArray();

      const result = mapRawToPlans(plan, sessions, activities);

      return response.status(200).send(result);
    } else {
      log("Trainer try to look for user plan", LogLevel.WARNING, {
        planOwnerId: id,
      });
      return response.status(404).send({ error: "plan not found" });
    }
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).send({ error: "something went wrong" });
  }
};

import { DbTable } from "./../../utils/const";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { validateUser, verifyToken } from "../../utils/token";
import { DB_NAME } from "../../utils/const";
import { extractTokenFromRequest, mapRawToPlans } from "../../utils/helper";
import { Activity, Plan, Session } from "../../utils/types";
import { log, LogLevel } from "../../utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const isValid = validateUser(request);

    const { id } = request.body;
    const client = await connectToDatabase();

    if (!client) {
      throw new Error("mongoClient is null");
    }

    const db = client.db(DB_NAME);
    const plan = await db.collection<Plan>(DbTable.PLANS).findOne({ id: id });

    if (plan) {
      if (plan.trainerId === isValid.id) {
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

        return response.status(200).json(result);
      }
    } else {
      log("Trainer try to look for user plan", LogLevel.WARNING, {
        userId: id,
      });
      return response.status(404).send({ error: "plan not found" });
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).json({ error: "something went wrong" });
  }
};

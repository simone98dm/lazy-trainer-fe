import { DbTable } from "./../../utils/const";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { verifyToken } from "../../utils/token";
import { DB_NAME } from "../../utils/const";
import { extractTokenFromRequest, mapRawToPlans } from "../../utils/helper";
import { Activity, Plan, Session } from "../../utils/types";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      return response.status(400).end();
    }

    const bearer = extractTokenFromRequest(request);

    const { id } = request.body;

    const decoded = verifyToken(bearer);
    if (decoded) {
      const d = decoded as { id: string };
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db(DB_NAME);
      const plan = await db.collection<Plan>(DbTable.PLANS).findOne({ id: id });

      if (plan) {
        if (plan.trainerId === d.id) {
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
      }
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "something went wrong" });
  }
};

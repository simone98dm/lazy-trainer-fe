import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ITokenPayload } from "../../src/models/User";
import { connectToDatabase } from "../../utils/db";
import { ISession } from "../../src/models/Session";
import { IPlan } from "../../src/models/Plan";
import { verifyToken } from "../../utils/token";
import { DbTable, DB_NAME } from "../../utils/const";
import { extractTokenFromRequest, mapRawToPlans } from "../../utils/helper";
import { Activity, Plan, Session } from "../../utils/types";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      return response.status(400).end();
    }

    const bearer = extractTokenFromRequest(request);
    if (!bearer) {
      return response
        .status(400)
        .send({ error: "authorization header not found" });
    }

    const decoded = verifyToken(bearer);
    if (decoded) {
      const { id } = decoded as ITokenPayload;

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

        response.status(200).send(result);
      } else {
        response.status(404).send({ error: "plan not found" });
      }
    } else {
      response.status(403).send({ error: "user not authorized" });
    }
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

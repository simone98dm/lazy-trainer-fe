import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ITokenPayload } from "../../src/models/User";
import { connectToDatabase } from "../../utils/db";
import { ISession } from "../../src/models/Session";
import { IPlan } from "../../src/models/Plan";
import { verifyToken } from "../../utils/token";
import { DbTable, DB_NAME } from "../../utils/const";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "GET") {
      return response.status(400).end();
    }

    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

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
      const plan = await db.collection(DbTable.PLANS).findOne({ ownerId: id });
      if (plan) {
        const sessions = await db
          .collection(DbTable.SESSIONS)
          .find({ planId: plan?.id })
          .toArray();

        const sessionIds = sessions.map((session) => session.id);
        const activities = await db
          .collection(DbTable.ACTIVITIES)
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

export function mapRawToPlans(
  plan: any,
  sessions: any[],
  activities: any[]
): IPlan {
  return {
    name: plan.name,
    id: plan.id,
    trainerId: plan.trainerId,
    sessions: mapRawToSession(sessions, activities),
  };
}

export function mapRawToSession(
  sessions: {
    id: string;
    dayOfWeek: number;
  }[],
  activities: {
    id: string;
    description: string;
    name: string;
    time: number;
    reps: number;
    order: number;
    warmup: boolean;
    videoUrl: string;
    requestChange: boolean;
    sessionId: string;
  }[]
): ISession[] {
  const parsedSessions: ISession[] = [];
  for (const session of sessions) {
    const filteredExtensions = activities
      .filter((activity) => activity.sessionId === session.id)
      .map((activity) => ({
        id: activity.id,
        description: activity.description,
        name: activity.name,
        time: activity.time,
        reps: activity.reps,
        order: activity.order,
        warmup: activity.warmup,
        videoUrl: activity.videoUrl,
        requestChange: activity.requestChange,
      }));

    parsedSessions.push({
      dayOfWeek: session.dayOfWeek,
      id: session.id,
      activities: filteredExtensions,
    });
  }

  return parsedSessions;
}

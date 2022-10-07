import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { verifyToken } from "../../utils/token";
import { IPlan } from "../../src/models/Plan";
import { ISession } from "../../src/models/Session";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      return response.status(400).end();
    }

    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const { id } = request.body;

    const decoded = verifyToken(bearer);
    if (decoded) {
      const d = decoded as { id: string };
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db("lazyTrainerDb");
      const plan = await db.collection("plans").findOne({ id: id });

      if (plan) {
        if (plan.trainerId === d.id) {
          const sessions = await db
            .collection("sessions")
            .find({ planId: plan?.id })
            .toArray();

          const sessionIds = sessions.map((session) => session.id);
          const activities = await db
            .collection("activities")
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

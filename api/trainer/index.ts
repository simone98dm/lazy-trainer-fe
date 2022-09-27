import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase, verifyToken } from "../all";
import { IPlan } from "./../../src/models/Plan";
import { ISession } from "../../src/models/Session";
import { IUser } from "./../../src/models/User";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

    if (!bearer) {
      response.status(400).send({ error: "authorization header not found" });
      return;
    }

    const decoded = verifyToken(bearer);
    if (decoded) {
      const { id } = decoded as IUser;

      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const db = client.db("lazyTrainerDb");
      const plan = await db.collection("plans").findOne({ ownerId: id });
      if (plan) {
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

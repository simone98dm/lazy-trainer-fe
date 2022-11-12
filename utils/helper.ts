import { IPlan } from "../src/models/Plan";
import { ISession } from "../src/models/Session";
import { DbTable, DB_NAME } from "./const";
import { connectToDatabase } from "./db";
import { Activity, Plan, Session } from "./types";

export function mapRawToPlans(
  plan: Plan,
  sessions: Session[],
  activities: Activity[]
): IPlan {
  return {
    name: plan.name,
    id: plan.id,
    trainerId: plan.trainerId,
    sessions: mapRawToSession(sessions, activities),
  };
}

export function mapRawToSession(
  sessions: Session[],
  activities: Activity[]
): ISession[] {
  const parsedSessions: ISession[] = [];
  for (const session of sessions) {
    const filteredExtensions = activities
      .filter((activity) => activity.sessionId === session.id)
      .sort((a, b) => a.order - b.order)
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

export function extractTokenFromRequest(request: any): string {
  return request.headers.authorization?.split(" ")[1] ?? "";
}

export async function verifyUser(id?: string) {
  if (!id) {
    return false;
  }
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db(DB_NAME);
  const user = await db.collection(DbTable.USERS).findOne({ id: id });
  return user !== null;
}

import { IPlan } from "../../../src/models/Plan";
import { ISession } from "../../../src/models/Session";

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
      }));

    parsedSessions.push({
      dayOfWeek: session.dayOfWeek,
      id: session.id,
      activities: filteredExtensions,
    });
  }

  return parsedSessions;
}

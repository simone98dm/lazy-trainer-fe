import { Activity, IPlan, ISession, Plan, Session } from "../index";

export function mapRawToPlans(plan: Plan, sessions: Session[], activities: Activity[]): IPlan {
  return {
    name: plan.name,
    id: plan.id,
    trainerId: plan.trainerId,
    sessions: mapRawToSession(sessions, activities),
  };
}

export function mapRawToSession(sessions: Session[], activities: Activity[]): ISession[] {
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

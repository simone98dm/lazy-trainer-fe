import { ICustomSession, ISession } from "./../models/Session";

export function parseSessions(session: ISession): ICustomSession {
  return {
    ...session,
    description: `${session.activities.length} ${
      session.activities.length > 1 ? "activities" : "activity"
    }`,
    name: getDayOfTheWeek(session.dayOfWeek),
  };
}

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getDayOfTheWeek(day?: number) {
  const dayName = days[day ?? 0];
  return dayName;
}

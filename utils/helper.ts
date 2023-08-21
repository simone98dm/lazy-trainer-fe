import { Plan } from "~/models/Plan";
import { CustomSession, Session } from "~/models/Session";
import { v4 as uuid } from "uuid";

export function parseSessions(session: Session): CustomSession {
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

export function millisToMinutesAndSeconds(millis: number) {
  if (!millis) {
    return `0'00"`;
  }

  const minutes: number = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  if (minutes === 0) {
    return `${(seconds < 10 ? "0" : "") + seconds}"`;
  }
  return `${minutes}'${(seconds < 10 ? "0" : "") + seconds}"`;
}

export function generateBlankPlan(): Plan {
  return {
    id: uuid(),
    name: "New plan",
    sessions: [],
    trainerId: "",
  };
}

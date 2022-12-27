import { ICustomSession, ISession } from "./../models/Session";
import { getDayOfTheWeek } from "./dates";

export function parseSessions(session: ISession): ICustomSession {
  return {
    ...session,
    description: `${session.activities.length} ${
      session.activities.length > 1 ? "activities" : "activity"
    }`,
    name: getDayOfTheWeek(session.dayOfWeek),
  };
}

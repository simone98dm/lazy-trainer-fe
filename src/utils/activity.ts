import { IActivity } from "../models/Activity";
import { Act } from "./types";

export function getActivity(activities: IActivity[], activityId: string): Act {
  let obj: Act;
  if (!activityId && activities.length > 0) {
    obj = { firstActivity: activities[0], secondActivity: undefined };
    if (activities.length > 1) {
      obj = { ...obj, secondActivity: activities[1] };
    }
    return obj;
  }

  const firstActivityIndex =
    activities?.findIndex((act) => act.id === activityId) ?? undefined;
  const secondActivityIndex = firstActivityIndex + 1;

  const firstActivity = activities[firstActivityIndex];
  obj = { firstActivity, secondActivity: undefined };
  if (secondActivityIndex < activities.length) {
    obj = { ...obj, secondActivity: activities[secondActivityIndex] };
    return obj;
  }

  return obj;
}

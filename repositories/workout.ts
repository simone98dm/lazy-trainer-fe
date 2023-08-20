import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { Repository } from "./common";
import { IPlan, ISession } from "~/backend";
import { IActivity } from "models/Activity";

export interface WorkoutRepository {
  getUserPlan(): Promise<IPlan | undefined>;
  addActivity(activity: IActivity, sessionId: string): Promise<void>;
  removeActivity(activityId: string): Promise<void>;
  updateActivity(activity: IActivity, activityId: string): Promise<void>;
}

async function getUserPlan(): Promise<IPlan | undefined> {
  const client = useWorkoutClient();
  const user = useSupabaseUser();
  const planResponse = await client.from("plans").select("id,name").eq("ownerId", user.value.id);

  if (planResponse.error) {
    throw planResponse.error;
  }

  const [plan] = planResponse.data;

  const sessionsResponse = await client
    .from("sessions")
    .select("*,activities(*)")
    .eq("planId", plan.id);

  const sessions = mapUserPlan(plan as IPlan, sessionsResponse.data as ISession[]);

  return sessions;
}

async function addActivity(activity: IActivity, sessionId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").insert(activity).eq("sessionsid", sessionId);
}
async function removeActivity(activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").delete().eq("id", activityId);
}
async function updateActivity(activity: IActivity, activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").update(activity).eq("id", activityId);
}

export const workoutRepository: Repository<WorkoutRepository> = {
  getUserPlan,
  addActivity,
  removeActivity,
  updateActivity,
};

function mapUserPlan(plan: IPlan, sessions: ISession[]): IPlan {
  return {
    ...plan,
    sessions,
  };
}

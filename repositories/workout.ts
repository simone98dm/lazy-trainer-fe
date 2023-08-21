import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { Repository } from "./common";
import { Activity } from "models/Activity";
import { Plan } from "~/models/Plan";
import { Session } from "~/models/Session";

export interface WorkoutRepository {
  getUserPlan(): Promise<Plan | undefined>;
  addActivity(activity: Activity, sessionId: string): Promise<void>;
  removeActivity(activityId: string): Promise<void>;
  updateActivity(activity: Activity, activityId: string): Promise<void>;
}

async function getUserPlan(): Promise<Plan | undefined> {
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

  const sessions = mapUserPlan(plan as Plan, sessionsResponse.data as Session[]);

  return sessions;
}

async function addActivity(activity: Activity, sessionId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").insert(activity).eq("sessionsid", sessionId);
}
async function removeActivity(activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").delete().eq("id", activityId);
}
async function updateActivity(activity: Activity, activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").update(activity).eq("id", activityId);
}

export const workoutRepository: Repository<WorkoutRepository> = {
  getUserPlan,
  addActivity,
  removeActivity,
  updateActivity,
};

function mapUserPlan(plan: Plan, sessions: Session[]): Plan {
  return {
    ...plan,
    sessions,
  };
}

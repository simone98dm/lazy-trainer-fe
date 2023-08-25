import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { Repository } from "./common";
import { Activity } from "models/Activity";
import { Plan } from "~/models/Plan";
import { Session } from "~/models/Session";
import { OrderRequest } from "~/utils";
import { Completion } from "~/models/Completion";

export interface WorkoutRepository {
  getUserPlan(userId: string): Promise<Plan | null>;
  addActivity(activity: Activity, sessionId: string): Promise<void>;
  updateActivity(activity: Activity, activityId: string): Promise<void>;
  requestActivityChange(activityId: string): Promise<void>;
  deleteActivity(activityId: string): Promise<void>;
  addSession(planId: string, session: Session): Promise<void>;
  updateSession(sessionId: string, data: { id: string; dayOfWeek: number }): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;
  getPlan(planId: string): Promise<Plan | null>;
  sortActivities(request: OrderRequest[]): Promise<void>;
  completeWorkout(sessionId: string): Promise<void>;
  getUserStats(userId: string[]): Promise<Completion[] | null>;
}

async function getUserPlan(userId: string): Promise<Plan | null> {
  const client = useWorkoutClient();
  const planResponse = await client.from("plans").select("id,name").eq("ownerId", userId);

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
async function updateActivity(activity: Activity, activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").update(activity).eq("id", activityId);
}
async function deleteActivity(activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").delete().eq("id", activityId);
}
async function requestActivityChange(activityId: string) {
  const client = useWorkoutClient();
  await client.from("activities").update({ requestChange: true }).eq("id", activityId);
}
async function addSession(planId: string, session: Session): Promise<void> {
  const client = useWorkoutClient();
  await client.from("sessions").insert({
    id: session.id,
    dayOfWeek: session.dayOfWeek,
    planId,
  });
  if (session.activities) {
    const promiseActivities = session.activities.map((act) => addActivity(act, session.id));
    await Promise.all(promiseActivities);
  }
}
async function updateSession(
  sessionId: string,
  data: { id: string; dayOfWeek: number }
): Promise<void> {
  const client = useWorkoutClient();
  await client.from("sessions").update(data).eq("id", sessionId);
}
async function deleteSession(sessionId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("sessions").delete().eq("id", sessionId);
}
async function getPlan(planId: string): Promise<Plan | null> {
  const client = useWorkoutClient();
  const { data, error } = await client.from("plan").select("ownerId").eq("id", planId);
  if (error) {
    return null;
  }
  const [plan] = data;
  return await getUserPlan(plan.ownerId);
}
async function sortActivities(request: OrderRequest[]): Promise<void> {
  const client = useWorkoutClient();
  const requestPromise = request.map((r) =>
    client.from("activities").update({ order_index: r.order_index }).eq("id", r.id)
  );
  await Promise.all(requestPromise);
}
async function completeWorkout(userId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("stats").insert({
    userId,
  });
}
async function getUserStats(userId: string[]): Promise<Completion[] | null> {
  const client = useWorkoutClient();
  const { data, error } = await client
    .from("stats")
    .select("completeTime,users(id,name)")
    .in("userId", userId);
  if (error) {
    return null;
  }

  return data.map((x) => ({
    userId: x.users[0].id,
    userName: x.users[0].name,
    stats: { completion: data.map((s) => `${s.completeTime}`) },
  }));
}

export const workoutRepository: Repository<WorkoutRepository> = {
  getUserPlan,
  addActivity,
  updateActivity,
  deleteActivity,
  requestActivityChange,
  addSession,
  updateSession,
  deleteSession,
  getPlan,
  sortActivities,
  completeWorkout,
  getUserStats,
};

function mapUserPlan(plan: Plan, sessions: Session[]): Plan {
  return {
    ...plan,
    sessions,
  };
}

import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { Repository } from "./common";
import { Activity } from "models/Activity";
import { Plan } from "~/models/Plan";
import { Session } from "~/models/Session";
import { OrderRequest } from "~/utils";
import { Completion } from "~/models/Completion";

export interface WorkoutRepository {
  getUserPlan(userId: string): Promise<Plan | null>;
  addActivity(activity: Activity): Promise<Activity | null>;
  updateActivity(activity: Activity, activityId: string): Promise<void>;
  requestActivityChange(activityId: string): Promise<void>;
  deleteActivity(activityId: string): Promise<void>;
  addSession(session: Session): Promise<Session | null>;
  updateSession(session: Session, sessionId: string): Promise<void>;
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
async function addActivity(activity: Activity): Promise<Activity | null> {
  const client = useWorkoutClient();
  const { data } = await client.from("activities").insert(activity).select();
  if (data) {
    return data[0] as Activity;
  }
  return null;
}
async function updateActivity(activity: Activity, activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").update(activity).eq("id", activityId).select();
}
async function deleteActivity(activityId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("activities").delete().eq("id", activityId).select();
}
async function requestActivityChange(activityId: string) {
  const client = useWorkoutClient();
  await client.from("activities").update({ requestChange: true }).eq("id", activityId).select();
}
async function addSession(session: Session): Promise<Session | null> {
  const client = useWorkoutClient();
  const { data } = await client
    .from("sessions")
    .insert({
      id: session.id,
      dayOfWeek: session.dayOfWeek,
      planId: session.planId,
    })
    .select();

  if (data) {
    if (session.activities) {
      const promiseActivities = session.activities.map((act) => addActivity(act));
      await Promise.all(promiseActivities);
    }

    return data[0] as Session;
  }
  return null;
}
async function updateSession(session: Session, sessionId: string): Promise<void> {
  const client = useWorkoutClient();
  const { dayOfWeek, id, planId } = session;
  await client.from("sessions").update({ dayOfWeek, id, planId }).eq("id", sessionId).select();
}
async function deleteSession(sessionId: string): Promise<void> {
  const client = useWorkoutClient();
  await client.from("sessions").delete().eq("id", sessionId).select();
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

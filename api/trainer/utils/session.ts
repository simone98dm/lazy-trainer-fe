import { connectToDatabase } from "../../all";

/**
 * Delete a session
 * @param sessionId id of the session to delete
 */
export async function deleteSession(sessionId: string) {
  if (!sessionId) {
    throw new Error("unable to find session");
  }

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db("lazyTrainerDb");
  await db.collection("sessions").deleteOne({ id: sessionId });
  await db.collection("activities").deleteMany({ sessionId: sessionId });
}

/**
 * Update session configurations
 * @param sessionId id of the session to update
 * @param data new session configuration
 */
export async function updateSession(sessionId: string, data: any) {
  if (!sessionId) {
    throw new Error("unable to find session");
  }
  if (!data) {
    throw new Error("payload not valid");
  }

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db("lazyTrainerDb");
  await db
    .collection("sessions")
    .findOneAndUpdate(
      { id: sessionId },
      { $set: { dayOfWeek: data.dayOfWeek } }
    );
}

/**
 * Create a new session
 * @param planId id of plan to attach the new session
 * @param data session configurations
 */
export async function createSession(planId: string, data: any) {
  if (!planId) {
    throw new Error("unable to find the plan");
  }

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db("lazyTrainerDb");
  await db.collection("sessions").insertOne({ ...data, planId });
}

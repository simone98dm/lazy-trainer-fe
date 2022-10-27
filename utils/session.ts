import { DbTable, DB_NAME } from "./const";
import { connectToDatabase } from "./db";

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

  const db = client.db(DB_NAME);
  await db.collection(DbTable.SESSIONS).deleteOne({ id: sessionId });
  await db.collection(DbTable.ACTIVITIES).deleteMany({ sessionId: sessionId });
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

  const db = client.db(DB_NAME);
  await db
    .collection(DbTable.SESSIONS)
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

  const { id, dayOfWeek, warmup } = data;

  if (dayOfWeek === -1 || dayOfWeek >= 7) {
    throw new Error("day of week not valid");
  }

  const db = client.db(DB_NAME);
  const exists = await db
    .collection(DbTable.SESSIONS)
    .findOne({ dayOfWeek: dayOfWeek, planId: planId });
  if (exists) {
    throw new Error("session already exists");
  }
  await db.collection(DbTable.SESSIONS).insertOne({ id, dayOfWeek, planId });
  if (warmup) {
    const updatedWarmup = warmup.map((warm: any) => ({
      sessionId: id,
      ...warm,
    }));
    if (updatedWarmup.length > 0) {
      await db.collection(DbTable.ACTIVITIES).insertMany(updatedWarmup);
    }
  }
}

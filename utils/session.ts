import { DbTable, DB_NAME } from "./const";
import { connectToDatabase } from "./db";
import { log, LogLevel } from "./logger";

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

  const delActivities = await db
    .collection(DbTable.ACTIVITIES)
    .deleteMany({ sessionId: sessionId });
  if (delActivities.deletedCount === 0) {
    throw new Error("unable to delete activities");
  } else {
    log(`activities deleted: ${delActivities.deletedCount}`, LogLevel.INFO);
  }

  const delSession = await db
    .collection(DbTable.SESSIONS)
    .deleteOne({ id: sessionId });
  if (delSession.deletedCount === 0) {
    throw new Error("unable to delete session");
  } else {
    log(`deleted session ${sessionId}`, LogLevel.INFO);
  }
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

  const result = await client
    .db(DB_NAME)
    .collection(DbTable.SESSIONS)
    .findOneAndUpdate(
      { id: sessionId },
      { $set: { dayOfWeek: data.dayOfWeek } }
    );

  if (result.ok !== 1) {
    throw new Error("unable to update session");
  } else {
    log(`updated session ${sessionId}`, LogLevel.INFO);
  }
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

  const session = { id, dayOfWeek, planId };
  const result = await db.collection(DbTable.SESSIONS).insertOne(session);
  if (!result.insertedId) {
    throw new Error("unable to insert session");
  } else {
    log(`created session ${id}`, LogLevel.INFO);
  }

  if (warmup) {
    const updatedWarmup = warmup.map((warm: any) => ({
      sessionId: id,
      ...warm,
    }));
    if (updatedWarmup.length > 0) {
      const result = await db
        .collection(DbTable.ACTIVITIES)
        .insertMany(updatedWarmup);

      if (result.insertedCount < updatedWarmup.length) {
        throw new Error("unable to insert warmup");
      } else {
        log("Warmup created", LogLevel.INFO, { counter: warmup.length });
      }
    }
  }
}

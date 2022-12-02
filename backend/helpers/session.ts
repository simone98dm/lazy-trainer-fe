import { DbTable, DB_NAME } from "../const";
import { connectToDatabase } from "../drivers/mongodb";
import logger from "../utils/logger";

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
  logger.info(`activities deleted: ${delActivities.deletedCount}`);

  const delSession = await db
    .collection(DbTable.SESSIONS)
    .deleteOne({ id: sessionId });
  logger.info(`deleted session ${sessionId}`);
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
    logger.info(`updated session ${sessionId}`);
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
    logger.info(`created session ${id}`);
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
        logger.info("Warmup created", { counter: warmup.length });
      }
    }
  }
}
import {
  connectToDatabase,
  DbTable,
  DB_NAME,
  IActivity,
  ISession,
  logger,
  Statistics,
  UserStats,
} from "..";

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

  await db.collection(DbTable.SESSIONS).deleteOne({ id: sessionId });
  logger.info(`deleted session ${sessionId}`);
}

/**
 * Update session configurations
 * @param sessionId id of the session to update
 * @param data new session configuration
 */
export async function updateSession(sessionId: string, data: ISession) {
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
    .findOneAndUpdate({ id: sessionId }, { $set: { dayOfWeek: data.dayOfWeek } });

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
export async function createSession(
  planId: string,
  data: { id: string; dayOfWeek: number; warmup: IActivity[] | undefined }
) {
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
    const updatedWarmup = warmup.map((warm: IActivity) => ({
      sessionId: id,
      ...warm,
    }));
    if (updatedWarmup.length > 0) {
      const result = await db.collection(DbTable.ACTIVITIES).insertMany(updatedWarmup);

      if (result.insertedCount < updatedWarmup.length) {
        throw new Error("unable to insert warmup");
      } else {
        logger.info("Warmup created", { counter: warmup.length });
      }
    }
  }
}

export async function markSessionAsComplete(userId: string, sessionId: string) {
  if (!userId) {
    throw new Error("unable to find user");
  }
  if (!sessionId) {
    throw new Error("unable to find session");
  }

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db(DB_NAME);

  let existingStats: UserStats | null = await db
    .collection<UserStats>(DbTable.STATS)
    .findOne({ userId: userId });

  if (!existingStats || !existingStats.stats) {
    existingStats = {
      userId: userId,
      stats: { completion: [] },
    };
  }

  const stats = existingStats.stats as Statistics;
  const currentDate = new Date();
  const alreadyExist =
    stats.completion.length > 0
      ? stats.completion.find((complete) => {
          return checkCompleteDate(new Date(complete), currentDate);
        })
      : false;

  const completion = [...stats.completion];
  if (!alreadyExist) {
    completion.push(currentDate.toISOString());
  }

  const result = await db
    .collection(DbTable.STATS)
    .findOneAndUpdate({ userId: userId }, { $set: { stats: { completion } } }, { upsert: true });

  if (result.ok !== 1) {
    throw new Error("unable to update completion");
  } else {
    logger.info(`updated completion ${userId}`);
  }
}

function checkCompleteDate(complete: Date, currentDate: Date) {
  return (
    complete.getDate() === currentDate.getDate() &&
    complete.getMonth() === currentDate.getMonth() &&
    complete.getFullYear() === currentDate.getFullYear()
  );
}

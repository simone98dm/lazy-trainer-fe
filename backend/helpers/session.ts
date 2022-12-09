import { DbTable, DB_NAME } from "../const";
import { connectToDatabase, pool } from "../drivers/postgresdb";
import { Statistics, User, UserStats } from "../types";
import logger from "../utils/logger";

/**
 * Delete a session
 * @param sessionId id of the session to delete
 */
export async function deleteSession(sessionId: string) {
  if (!sessionId) {
    throw new Error("unable to find session");
  }

  const client = await pool.connect();
  const { rows } = await client.query(
    `DELETE FROM ${DbTable.ACTIVITIES} WHERE sessionid = $1;`,
    [sessionId]
  );
  logger.info(`activities deleted: ${rows.length}`);

  await client.query(`DELETE FROM ${DbTable.SESSIONS} WHERE id = $1;`, [
    sessionId,
  ]);
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

  const client = await pool.connect();
  const { rows } = await client.query(
    `UPDATE ${DbTable.SESSIONS} SET 
      dayofweek = $1,
      planid = $2
      WHERE id = $3;`,
    [data.dayOfWeek, data.planId, sessionId]
  );

  if (rows.length === 0) {
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

  const { id, dayOfWeek, warmup } = data;

  if (dayOfWeek === -1 || dayOfWeek >= 7) {
    throw new Error("day of week not valid");
  }

  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT id FROM ${DbTable.SESSIONS} WHERE dayofweek = $1 AND planid = $2;`,
    [dayOfWeek, planId]
  );

  if (rows.length === 0) {
    throw new Error("session already exists");
  }

  const { rowCount } = await client.query(
    `INSERT INTO ${DbTable.SESSIONS} (id, dayofweek, planid) VALUES ($1, $2, $3);`,
    [id, dayOfWeek, planId]
  );
  if (rowCount > 0) {
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
      updatedWarmup.forEach(async (warm: any) => {
        const { rows, rowCount } = await client.query(
          `INSERT INTO ${DbTable.ACTIVITIES} (id, sessionid, name, duration, type, order) VALUES ($1, $2, $3, $4, $5, $6);`,
          [
            warm.id,
            warm.sessionId,
            warm.name,
            warm.duration,
            warm.type,
            warm.order,
          ]
        );
        if (rowCount < updatedWarmup.length) {
          throw new Error("unable to insert warmup");
        } else {
          logger.info("Warmup created", { counter: warmup.length });
        }
      });
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

  const client = await pool.connect();
  let existing = await client.query(
    `SELECT stats FROM ${DbTable.STATS} WHERE userid = $1;`,
    [userId]
  );
  let existingStats: UserStats | null = null;
  if (!existing.rows || !existing.rows[0].stats) {
    existingStats = {
      userId: userId,
      stats: { completion: [] },
    };
  }

  const stats = (existingStats?.stats as Statistics) ?? ({} as Statistics);
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

  const { rowCount } = await client.query(
    `UPDATE ${DbTable.STATS} SET stats = $1 WHERE userid = $2;`,
    [completion, userId]
  );

  if (rowCount !== 1) {
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

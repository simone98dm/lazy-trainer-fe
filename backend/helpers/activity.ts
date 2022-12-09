import { DbTable, DB_NAME } from "../const";
import { pool } from "../drivers/postgresdb";
import { Activity } from "../types";
import logger from "../utils/logger";

/**
 * Delete an activity
 * @param activityId activitiy id to delete
 */
export async function deleteActivity(activityId: string) {
  if (!activityId) {
    throw new Error("unable to find session");
  }

  const client = await pool.connect();
  const { rows } = await client.query(
    `DELETE FROM ${DbTable.ACTIVITIES} WHERE id = $1;`,
    [activityId]
  );

  if (rows.length === 0) {
    throw new Error("unable to delete activity");
  } else {
    logger.info(`deleted activity ${activityId}`);
  }
}

/**
 * Update activity configurations
 * @param activityId id of activity to update
 * @param data new activity configurations
 */
export async function updateActivity(activityId: string, data: any) {
  if (!activityId) {
    throw new Error("unable to find session");
  }

  const client = await pool.connect();
  const { rows } = await client.query(
    `UPDATE ${DbTable.ACTIVITIES} SET 
      description = $1, 
      name = $2, 
      order_index = $3, 
      "time" = $4, 
      reps = $5, 
      videoUrl = $6, 
      requestChange = $7, 
      warmup = $8 
    WHERE id = $9;`,
    [
      data.description,
      data.name,
      data.order,
      data.time,
      data.reps,
      data.videoUrl,
      data.requestChange,
      data.warmup,
      activityId,
    ]
  );

  if (rows.length === 0) {
    throw new Error("unable to update activity");
  } else {
    logger.info(`updated activity ${activityId}`);
  }
}

/**
 * Create a new activity
 * @param sessionId session to attach the new activity
 * @param data new activity configuration
 */
export async function createActivity(sessionId: string, data: any) {
  if (!sessionId) {
    throw new Error("unable to find the plan");
  }
  const client = await pool.connect();
  const { rows } = await client.query(
    `INSERT INTO ${DbTable.ACTIVITIES} 
        (id, description, name, order_index, "time", reps, videoUrl, requestChange, warmup, sessionid)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
    [
      data.id,
      data.description,
      data.name,
      data.order,
      data.time,
      data.reps,
      data.videoUrl,
      data.requestChange,
      data.warmup,
      sessionId,
    ]
  );
  if (rows.length !== 0) {
    throw new Error("unable to create activity");
  } else {
    logger.info(`created activity ${data.id}`);
  }
}

export async function getActivities(sessionId: string) {
  if (!sessionId) {
    throw new Error("unable to find the plan");
  }
  const client = await pool.connect();
  const activities = await client.query<Activity>(
    `SELECT * FROM ${DbTable.ACTIVITIES} WHERE sessionid = $1;`,
    [sessionId]
  );
  return activities;
}

/**
 * Sort activities
 * @param activities activities to sort
 */
export async function sortActivities(data: { id: string; order: number }[]) {
  const client = await pool.connect();
  const promises = data.map((activity) =>
    client.query(
      `UPDATE ${DbTable.ACTIVITIES} SET order_index = $1 WHERE id = $2;`,
      [activity.order, activity.id]
    )
  );

  await Promise.all(promises);
}

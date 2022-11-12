import { DbTable, DB_NAME } from "./const";
import { connectToDatabase } from "./db";
import { log, LogLevel } from "./logger";

/**
 * Delete an activity
 * @param activityId activitiy id to delete
 */
export async function deleteActivity(activityId: string) {
  if (!activityId) {
    throw new Error("unable to find session");
  }

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const result = await client
    .db(DB_NAME)
    .collection(DbTable.ACTIVITIES)
    .deleteOne({ id: activityId });
  if (result.deletedCount === 0) {
    throw new Error("unable to delete activity");
  } else {
    log(`deleted activity ${activityId}`, LogLevel.INFO);
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

  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const result = await client
    .db(DB_NAME)
    .collection(DbTable.ACTIVITIES)
    .findOneAndUpdate(
      { id: activityId },
      {
        $set: {
          description: data.description,
          name: data.name, order: data.order,
          time: data.time,
          reps: data.reps,
          videoUrl: data.videoUrl,
          requestChange: data.requestChange,
          warmup: data.warmup,
        },
      }
    );

  if (result.ok === 0) {
    throw new Error("unable to update activity");
  } else {
    log(`updated activity ${activityId}`, LogLevel.INFO);
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
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const result = await client
    .db(DB_NAME)
    .collection(DbTable.ACTIVITIES)
    .insertOne({ ...data, sessionId });

  if (!result.insertedId) {
    throw new Error("unable to create activity");
  } else {
    log(`created activity ${data.id}`, LogLevel.INFO);
  }
}

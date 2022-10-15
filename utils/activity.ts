import { DbTable, DB_NAME } from "./const";
import { connectToDatabase } from "./db";

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

  const db = client.db(DB_NAME);
  await db.collection(DbTable.ACTIVITIES).deleteOne({ id: activityId });
  await client.close();
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

  const db = client.db(DB_NAME);
  await db.collection(DbTable.ACTIVITIES).findOneAndUpdate(
    { id: activityId },
    {
      $set: {
        description: data.description,
        name: data.name,
        time: data.time,
        reps: data.reps,
        videoUrl: data.videoUrl,
        requestChange: data.requestChange,
        warmup: data.warmup,
      },
    }
  );
  await client.close();
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

  const db = client.db(DB_NAME);

  await db.collection(DbTable.ACTIVITIES).insertOne({ ...data, sessionId });
  await client.close();
}

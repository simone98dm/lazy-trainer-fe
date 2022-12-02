import { DbTable, DB_NAME } from "../const";
import { connectToDatabase } from "../drivers/mongodb";
import { Activity, Config, Plan, Session, User, UserStats } from "../types";
import logger from "../utils/logger";
import { mapRawToPlans } from "../utils/mapper";

export async function verifyUser(id?: string) {
  if (!id) {
    return false;
  }
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db(DB_NAME);
  const user = await db.collection(DbTable.USERS).findOne({ id: id });
  return user !== null;
}

export async function getUser(username: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const db = client.db(DB_NAME);
  const user = await db
    .collection<User>(DbTable.USERS)
    .findOne({ name: username });

  return user;
}

export async function requestActivityChange(activityId: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  return await client
    .db(DB_NAME)
    .collection(DbTable.ACTIVITIES)
    .findOneAndUpdate({ id: activityId }, { $set: { requestChange: true } });
}

export async function getMappedPlan(ownerId: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const plan = await client
    .db(DB_NAME)
    .collection<Plan>(DbTable.PLANS)
    .findOne({ ownerId });

  if (!plan) {
    logger.warn("Trainer try to look for user plan", {
      planOwnerId: ownerId,
    });
    return null;
  }

  const session = await client
    .db(DB_NAME)
    .collection<Session>(DbTable.SESSIONS)
    .find({ planId: plan.id })
    .toArray();

  const sessionIds = session.map((s) => s.id);
  const activities = await client
    .db(DB_NAME)
    .collection<Activity>(DbTable.ACTIVITIES)
    .find({ sessionId: { $in: sessionIds } })
    .toArray();

  return mapRawToPlans(plan, session, activities);
}

export async function getTrainer(trainerId: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  return await client
    .db(DB_NAME)
    .collection<User>(DbTable.USERS)
    .findOne({ id: trainerId });
}

export async function getUserConfiguration(id: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const result = await client
    .db(DB_NAME)
    .collection<User>(DbTable.USERS)
    .findOne({ id: id });

  if (!result) {
    return {
      audioDisabled: false,
      easyMode: false,
    };
  }
  const data = JSON.parse(result.configurations);
  return data;
}

export async function saveConfiguration(id: string, options: Config) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const { audioDisabled, easyMode } = options;

  const configurations = JSON.stringify({ audioDisabled, easyMode });

  const result = await client
    .db(DB_NAME)
    .collection<User>(DbTable.USERS)
    .findOneAndUpdate({ id: id }, { $set: { configurations: configurations } });

  return result;
}

export async function getStats(userId: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const user = await client
    .db(DB_NAME)
    .collection<UserStats>(DbTable.STATS)
    .findOne({ userId: userId });

  if (user) {
    return user.stats;
  }

  return null;
}

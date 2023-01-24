import {
  Activity,
  Config,
  connectToDatabase,
  createActivity,
  createSession,
  DataAction,
  DbTable,
  DB_NAME,
  deleteActivity,
  deleteSession,
  logger,
  mapRawToPlans,
  Plan,
  Session,
  sortActivities,
  updateActivity,
  updateSession,
  User,
  UserStats,
} from "../index";

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
  const user = await db.collection<User>(DbTable.USERS).findOne({ name: username });

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

export async function getMappedPlan(searchFor: { id?: string; ownerId?: string }) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const plan = await client.db(DB_NAME).collection<Plan>(DbTable.PLANS).findOne(searchFor);

  if (!plan) {
    logger.warn("Trainer try to look for user plan", {
      planOwnerId: searchFor.ownerId,
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

  return await client.db(DB_NAME).collection<User>(DbTable.USERS).findOne({ id: trainerId });
}

export async function getUserConfiguration(id: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const result = await client.db(DB_NAME).collection<User>(DbTable.USERS).findOne({ id: id });

  if (!result?.configurations) {
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

  const { audioDisabled, easyMode, darkMode } = options;

  const configurations = JSON.stringify({ audioDisabled, easyMode, darkMode });

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

  const user = await client.db(DB_NAME).collection<User>(DbTable.USERS).findOne({ id: userId });

  if (!user) {
    return null;
  }

  const userStats: UserStats[] = [];
  if (Number(user.role) === 1) {
    // is trainer
    const plans = await client
      .db(DB_NAME)
      .collection<Plan>(DbTable.PLANS)
      .find({ trainerId: userId })
      .toArray();
    const clients = plans.map((plan) => plan.ownerId);

    const users = await client
      .db(DB_NAME)
      .collection<User>(DbTable.USERS)
      .find({ id: { $in: clients } })
      .toArray();

    const stats = await client
      .db(DB_NAME)
      .collection<UserStats>(DbTable.STATS)
      .find({ userId: { $in: clients } })
      .toArray();

    userStats.push(
      ...stats.map((s) => ({
        userId: s.userId,
        userName: users.find((u) => u.id === s.userId)?.name,
        stats: s.stats,
      }))
    );
  } else {
    const userStat = await client
      .db(DB_NAME)
      .collection<UserStats>(DbTable.STATS)
      .findOne({ userId: userId });
    if (userStat) {
      const s = { userId, stats: userStat.stats };
      userStats.push(s);
    }
  }

  return userStats;
}

export async function saveChanges(
  action: DataAction,
  sessionId: string,
  activityId: string,
  planId: string,
  data: any
) {
  switch (action) {
    case DataAction.SESSION_CREATE:
      await createSession(planId, data);
      break;
    case DataAction.SESSION_DELETE:
      await deleteSession(sessionId);
      break;
    case DataAction.SESSION_UPDATE:
      await updateSession(sessionId, data);
      break;
    case DataAction.ACTIVITY_CREATE:
      await createActivity(sessionId, data);
      break;
    case DataAction.ACTIVITY_DELETE:
      await deleteActivity(activityId);
      break;
    case DataAction.ACTIVITY_UPDATE:
      await updateActivity(activityId, data);
      break;
    case DataAction.ACTIVITY_SORT:
      await sortActivities(data);
      break;
    default:
      throw new Error("action not recognized");
  }
}

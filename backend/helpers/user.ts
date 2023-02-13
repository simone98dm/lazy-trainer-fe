import { DbTable } from "../utils/const";
import { pool } from "../drivers/postgresdb";
import { Activity, Config, Plan, Session, User, UserStats } from "../utils/types";
import { logger } from "../utils/logger";
import { mapRawToPlans } from "../utils/mapper";
import { getActivities } from "./activity";
import datasource from "../drivers";
import { activities, plans, sessions, users } from "../drivers/entity";

export async function verifyUser(id?: string) {
  if (!id) {
    return false;
  }
  const count = await datasource
    .createQueryBuilder(users, "users")
    .where("users.id = :id", { id: id })
    .getCount();
  return count > 0;
}

export async function getUser(username: string) {
  const user = await datasource
    .createQueryBuilder(users, "users")
    .where("users.name = :name", { name: username })
    .getOne();
  if (user) {
    return mapDtoToUser(user);
  }
  return null;
}

export async function requestActivityChange(activityId: string) {
  const result = await datasource
    .createQueryBuilder(activities, "activities")
    .update()
    .set({ requestchange: true })
    .where("id = :id", { id: activityId })
    .execute();

  return result.affected > 0;
}

export async function getMappedPlan(searchFor: { id?: string; ownerId?: string }) {
  const p = await datasource
    .createQueryBuilder()
    .select()
    .from(plans, "plans")
    .where("plans.id = :id", { id: searchFor.id })
    .orWhere("plans.ownerid = :ownerid", { ownerid: searchFor.ownerId })
    .getOne();

  if (!p) {
    logger.warn("Trainer try to look for user plan", {
      planOwnerId: searchFor.ownerId,
    });
    return null;
  }
  const s = await datasource
    .createQueryBuilder(sessions, "sessions")
    .where("sessions.planid = :planid", { planid: p.id })
    .getMany();

  const sessionIds = s.map((s) => s.id);

  const activities = await sessionIds.map(async (id) => {
    const { rows } = await getActivities(id);
    return rows;
  });
  const act: Activity[] = [...activities];
  const pp = await mapDtoToPlan(p);
  const ss = s.map(async (l) => await mapDtoToSession(l));
  return mapRawToPlans(pp, ss, act);
}

export async function getTrainer(trainerId: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT id, name, email, password, role, config FROM ${DbTable.USERS} WHERE id = $1`,
    [trainerId]
  );
  return rows[0];
}

export async function getUserConfiguration(id: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT id, name, hashPassword, role, configurations FROM ${DbTable.USERS} WHERE id = $1`,
    [id]
  );

  // const result = await client
  //   .db(DB_NAME)
  //   .collection<User>(DbTable.USERS)
  //   .findOne({ id: id });

  if (!rows[0].configurations) {
    return {
      audioDisabled: false,
      easyMode: false,
    };
  }
  const data = JSON.parse(rows[0].configurations);
  return data;
}

export async function saveConfiguration(id: string, options: Config) {
  const { audioDisabled, easyMode, darkMode } = options;

  const configurations = JSON.stringify({ audioDisabled, easyMode, darkMode });

  const client = await pool.connect();
  const { rowCount } = await client.query(
    `UPDATE ${DbTable.USERS} SET configurations = $1 WHERE id = $2`,
    [configurations, id]
  );
  return rowCount !== 0;
}

export async function getStats(userId: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT id, name, email, password, role, configurations FROM ${DbTable.USERS} WHERE id = $1`,
    [userId]
  );
  const user = rows[0];
  if (!user) {
    return null;
  }

  const userStats: UserStats[] = [];
  if (Number(user.role) === 1) {
    const plans = await client.query(
      `SELECT id, name, trainerid, ownerid FROM ${DbTable.PLANS} WHERE trainerid = $1`,
      [userId]
    );
    const clients = plans.rows.map((plan) => plan.ownerId);
    const users = await client.query(
      `SELECT id, name, email, password, role, configurations FROM ${DbTable.USERS} WHERE id = ANY($1)`,
      [clients]
    );
    const stats = await client.query(
      `SELECT id, userid, stats FROM ${DbTable.STATS} WHERE userid = ANY($1)`,
      [clients]
    );
    userStats.push(
      ...stats.rows.map((s) => ({
        userId: s.userId,
        userName: users.rows.find((u) => u.id === s.userId)?.name,
        stats: s.stats,
      }))
    );
  } else {
    const userStat = await client.query(
      `SELECT id, userid, stats FROM ${DbTable.STATS} WHERE userid = $1`,
      [userId]
    );
    if (userStat) {
      const s = { userId, stats: userStat.rows[0].stats };
      userStats.push(s);
    }
  }

  return userStats;
}

function mapDtoToUser(user: users): User {
  return {
    id: user.id,
    name: user.name,
    hashPassword: user.hashpassword,
    role: Number(user.role),
    configurations: JSON.stringify(user.configurations),
  };
}
async function mapDtoToPlan(p: plans): Promise<Plan> {
  return {
    id: p.id,
    name: p.name,
    trainerId: await p.trainer.then((t) => t.id),
    ownerId: await p.owner.then((o) => o.id),
  };
}

async function mapDtoToSession(s: sessions): Promise<Session> {
  return {
    id: s.id,
    dayOfWeek: s.dayofweek,
    planId: await s.plan.then((p) => p.id),
  };
}

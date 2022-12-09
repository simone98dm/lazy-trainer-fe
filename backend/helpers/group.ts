import { DbTable, DB_NAME } from "../const";
import { connectToDatabase, pool } from "../drivers/postgresdb";

export async function getTrainerPlans(id: string) {
  const client = await pool.connect();
  const { rows } = await client.query(
    `SELECT id, name, trainerid, ownerid FROM ${DbTable.PLANS} WHERE trainerid = $1`,
    [id]
  );
  return rows;
}

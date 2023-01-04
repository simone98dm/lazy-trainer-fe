import { DbTable, DB_NAME } from "../const";
import { connectToDatabase } from "../drivers/mongodb";
import { Plan } from "../types";

export async function getTrainerPlans(id: string) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("mongoClient is null");
  }

  const plans = await client
    .db(DB_NAME)
    .collection<Plan>(DbTable.PLANS)
    .find({ trainerId: id })
    .toArray();

  return plans;
}

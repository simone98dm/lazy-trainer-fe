import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { DbTable, DB_NAME, SECRET_KEY } from "../../utils/const";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      return response.status(400).end();
    }

    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const { id } = request.body;

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const db = client.db(DB_NAME);
      const plans = await db
        .collection("plans")
        .find({ trainerId: id })
        .toArray();

      if (plans) {
        const userIds = plans.map((plans) => plans.ownerId);
        const userInfos = await db
          .collection(DbTable.USERS)
          .find({ id: { $in: userIds } })
          .toArray();

        if (userInfos) {
          const p = plans.map((plan) => {
            const user = userInfos.find((user) => user.id === plan.ownerId);
            return { ...plan, username: user?.name };
          });

          return response.status(200).json(p);
        }
      }
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "something went wrong" });
  }
};

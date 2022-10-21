import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase } from "../../utils/db";
import { DbTable, DB_NAME, SECRET_KEY } from "../../utils/const";
import { Plan, User } from "../../utils/types";
import { extractTokenFromRequest } from "../../utils/helper";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      return response.status(400).end();
    }

    const bearer = extractTokenFromRequest(request);

    const { id } = request.body;

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const db = client.db(DB_NAME);
      const plans = await db
        .collection<Plan>(DbTable.PLANS)
        .find({ trainerId: id })
        .toArray();

      return response.status(200).json(plans);
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "something went wrong" });
  }
};

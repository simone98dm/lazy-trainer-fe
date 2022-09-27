import jwt, { decode } from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SECRET_KEY } from "../const";
import { connectToDatabase } from "../utils/connectToDatabase";
import { mapRawToPlans } from "../trainer/utils";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const { id } = JSON.parse(request.body);

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const d = decoded as { id: string };
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db("lazyTrainerDb");
      const plan = await db.collection("plans").findOne({ id: id });

      if (plan) {
        if (plan.trainerId === d.id) {
          const sessions = await db
            .collection("sessions")
            .find({ planId: plan?.id })
            .toArray();

          const sessionIds = sessions.map((session) => session.id);
          const activities = await db
            .collection("activities")
            .find({ sessionId: { $in: sessionIds } })
            .toArray();

          const result = mapRawToPlans(plan, sessions, activities);

          return response.status(200).json(result);
        }
      }
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "something went wrong" });
  }
};

import { ISession } from "./../../src/models/Session";
import { IPlan } from "./../../src/models/Plan";
import { IUser } from "./../../src/models/User";
import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SECRET_KEY } from "../const";
import { connectToDatabase } from "../utils/connectToDatabase";
import { ObjectId } from "mongodb";
import { mapRawToPlans } from "./utils";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

    if (!bearer) {
      response.status(400).send({ error: "authorization header not found" });
      return;
    }

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const { id } = decoded as IUser;

      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const db = client.db("lazyTrainerDb");
      const plan = await db.collection("plans").findOne({ ownerId: id });
      if (plan) {
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

        response.status(200).send(result);
      } else {
        response.status(404).send({ error: "plan not found" });
      }
    } else {
      response.status(403).send({ error: "user not authorized" });
    }
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

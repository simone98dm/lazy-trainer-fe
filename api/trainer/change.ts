import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DbTable, DB_NAME } from "../../utils/const";
import { connectToDatabase } from "../../utils/db";
import { verifyToken } from "../../utils/token";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method !== "POST") {
      return response.status(400).end();
    }

    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

    if (!bearer) {
      return response
        .status(400)
        .send({ error: "authorization header not found" });
    }

    const decoded = verifyToken(bearer);
    if (decoded) {
      const { activityId } = request.body;

      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const db = client.db(DB_NAME);

      await db
        .collection(DbTable.ACTIVITIES)
        .findOneAndUpdate(
          { id: activityId },
          { $set: { requestChange: true } }
        );
      await client.close();

      response.status(200).end();
    } else {
      response.status(403).send({ error: "user not authorized" });
    }
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

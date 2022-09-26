import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SECRET_KEY } from "../const";
import { connectToDatabase } from "../utils/connectToDatabase";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const traineId: string = request.query.user as string;

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db("lazyTrainerDb");
      const result = await db.collection("users").findOne({ id: traineId });
      if (result) {
        return response.status(200).json({
          id: result.id,
          name: result.name,
        });
      }
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.log("🚀 ~ file: index.ts ~ line 11 ~ error", error);
  }
};

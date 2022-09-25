import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SECRET_KEY } from "../const";
import { connectToDatabase } from "../utils/connectToDatabase";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const { id } = decoded as { id: string; username: string; role: number };

      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db("lazyTrainerDb");
      const collection = db.collection("users");
      const result = await collection.findOne({ id: id });

      return response.status(200).json(result);
    }
    return response.status(404).json({ error: "not found" });
  } catch (error) {
    console.log("🚀 ~ file: index.ts ~ line 11 ~ error", error);
  }
};

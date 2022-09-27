import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectToDatabase, verifyToken } from "../all";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? "";

    const traineId: string = request.query.user as string;

    const decoded = verifyToken(bearer);
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
    console.error(error);
    return response.status(500).json({ error: "something went wrong" });
  }
};

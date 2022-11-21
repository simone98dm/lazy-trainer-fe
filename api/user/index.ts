import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DbTable, DB_NAME } from "../../utils/const";
import { connectToDatabase } from "../../utils/db";
import { log, LogLevel } from "../../utils/logger";
import { validateUser } from "../../utils/token";
import { Config, User } from "../../utils/types";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const { id, name, role } = validateUser(request);
    if (request.method === "GET") {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const result = await client
        .db(DB_NAME)
        .collection<Config>(DbTable.USERS)
        .findOne({ id: id });

      if (!result) {
        log("unable to retrieve configurations", LogLevel.WARNING, { id });
        return response.status(200).send({
          configurations: {
            audioDisabled: false,
            easyMode: false,
          },
        });
      }
      const data = JSON.parse(result.configurations);
      return response.status(200).send(data);
    } else if (request.method === "POST") {
      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }

      const { audioDisabled, easyMode } = request.body;

      const configurations = JSON.stringify({ audioDisabled, easyMode });

      const result = await client
        .db(DB_NAME)
        .collection<Config>(DbTable.USERS)
        .findOneAndUpdate({ id: id }, { $set: { configurations } });

      if (!result) {
        log("Trainer not found", LogLevel.WARNING, { id });
        return response.status(404).json({ error: "not found" });
      }

      return response.status(200).end();
    }
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).json({ error: "something went wrong" });
  }
};

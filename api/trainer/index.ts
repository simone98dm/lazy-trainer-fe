import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SECRET_KEY } from "../const";
import fakeActivities from "../fake/db.json";

export default (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

    if (!bearer) {
      response.status(400).send({ error: "authorization header not found" });
      return;
    }

    const decoded = jwt.verify(bearer, SECRET_KEY);
    if (decoded) {
      const { id } = decoded as { id: string; username: string; role: string };
      const activities = fakeActivities.activites.filter((session) => session.owner === id);
      response.status(200).send(activities);
    } else {
      response.status(403).send({ error: "user not authorized" });
    }
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

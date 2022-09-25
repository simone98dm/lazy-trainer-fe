import { SECRET_KEY } from "./../const";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    const bearer = request.headers.authorization?.split(" ")[1] ?? undefined;

    if (!bearer) {
      response.status(400).send({ error: "authorization header not found" });
      return;
    }

    const decoded = jwt.verify(bearer, SECRET_KEY);

    if (decoded) {
      const newToken = await jwt.sign(decoded, SECRET_KEY);
      const { id, name, role } = decoded as {
        id: string;
        name: string;
        role: number;
      };

      const userResponse = {
        data: {
          id,
          name,
          role,
          token: newToken,
        },
      };

      response.status(200).send(userResponse);
    } else {
      response.status(403).send({ error: "user not authorized" });
    }
  } catch (error) {
    response.status(500).send({ error: "something went wrong" });
  }
};

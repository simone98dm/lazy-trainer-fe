import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDatabase, SECRET_KEY, verifyToken } from "../all";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(" ")[1];
      const isValid = verifyToken(token);
      if (!isValid) {
        response.status(403).send({ error: "token not valid" });
      } else {
        const body = {
          data: {
            id: isValid?.id,
            name: isValid?.name,
            role: isValid?.role,
            token,
          },
        };
        response.status(200).send(body);
      }
      return;
    } else {
      const { username, password } = request.body;
      if (!username) {
        response.status(400).send({ error: "username not provided" });
        return;
      }

      if (!password) {
        response.status(400).send({ error: "password not provided" });
        return;
      }

      const client = await connectToDatabase();
      if (!client) {
        throw new Error("mongoClient is null");
      }
      const db = client.db("lazyTrainerDb");
      const user = await db.collection("users").findOne({ name: username });
      if (!user) {
        response.status(404).send({ error: "username or password not valid" });
        return;
      }

      const founded = await bcrypt.compare(password, user?.hashPassword || "");
      if (!founded) {
        response.status(404).send({ error: "username or password not valid" });
        return;
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          role: Number(user.role),
        },
        SECRET_KEY,
        {
          expiresIn: "3d",
        }
      );

      const userResponse = {
        data: {
          name: user.name,
          id: user.id,
          role: Number(user.role),
          token,
        },
      };

      response.status(200).send(userResponse);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "something went wrong" });
  }
};

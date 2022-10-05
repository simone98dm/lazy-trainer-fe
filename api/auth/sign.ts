import { IUserResponse } from "./../../src/models/User";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDatabase, SECRET_KEY, verifyToken } from "../../utils/all";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "GET") {
      // renew or signout user from FE
      if (!request.headers.authorization) {
        return response.status(400).end();
      }

      let token = request.headers.authorization.split(" ")[1];

      const isValid = verifyToken(token);
      if (!isValid) {
        response.status(403).send({ error: "token not valid" });
      } else {
        let { id, name, role, hits } = isValid;

        if (hits >= 5) {
          return response.status(403).send({ error: "token hits exceed" });
        } else {
          // increment hits and renew token
          hits += 1;
          token = await jwt.sign({ id, name, role, hits }, SECRET_KEY);
        }

        const body: IUserResponse = {
          data: {
            id,
            name,
            role,
            token,
          },
        };

        response.status(200).send(body);
      }
      return;
    } else if (request.method === "POST") {
      // login user from FE
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
        return response
          .status(404)
          .send({ error: "username or password not valid" });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user?.hashPassword || ""
      );
      if (!passwordMatch) {
        return response
          .status(404)
          .send({ error: "username or password not valid" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        role: Number(user.role),
        hits: 1,
      };

      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "3d",
      });

      const userResponse: IUserResponse = {
        data: {
          name: user.name,
          id: user.id,
          role: Number(user.role),
          token,
        },
      };

      return response.status(200).send(userResponse);
    } else {
      return response.status(400).end();
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "something went wrong" });
  }
};

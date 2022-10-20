import { IUserResponse } from "./../../src/models/User";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../utils/db";
import { DbTable, DB_NAME, SECRET_KEY } from "../../utils/const";
import { verifyToken } from "../../utils/token";
import { User } from "../../utils/types";
import { extractTokenFromRequest } from "../../utils/helper";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "GET") {
      // renew or signout user from FE
      if (!request.headers.authorization) {
        return response.status(400).end();
      }

      let bearer = extractTokenFromRequest(request);

      const isValid = verifyToken(bearer);
      if (!isValid) {
        response.status(403).send({ error: "token not valid" });
      } else {
        let { id, name, role } = isValid;

        bearer = await jwt.sign({ id, name, role }, SECRET_KEY);

        const body: IUserResponse = {
          data: {
            id,
            name,
            role,
            token: bearer,
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
      const db = client.db(DB_NAME);
      const user = await db
        .collection<User>(DbTable.USERS)
        .findOne({ name: username });

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

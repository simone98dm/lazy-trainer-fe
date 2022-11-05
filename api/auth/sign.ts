import { IUserResponse } from "./../../src/models/User";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../utils/db";
import { DbTable, DB_NAME, SECRET_KEY } from "../../utils/const";
import { verifyToken } from "../../utils/token";
import { User } from "../../utils/types";
import { extractTokenFromRequest } from "../../utils/helper";
import { log, LogLevel } from "../../utils/logger";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "GET") {
      // renew or signout user from FE
      if (!request.headers.authorization) {
        log("User try to renew without token", LogLevel.WARNING);
        return response.status(400).end();
      }

      let bearer = extractTokenFromRequest(request);

      const isValid = verifyToken(bearer);
      if (!isValid) {
        log(
          "User try to renew token but the passed one is not valid",
          LogLevel.WARNING,
          { bearer }
        );
        return response.status(403).send({ error: "token not valid" });
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

        return response.status(200).send(body);
      }
    } else if (request.method === "POST") {
      // login user from FE
      const { username, password } = request.body;
      if (!username) {
        log("User try to login without username", LogLevel.WARNING);
        return response.status(400).send({ error: "username not provided" });
      }
      if (!password) {
        log("User try to login without password", LogLevel.WARNING);
        return response.status(400).send({ error: "password not provided" });
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
        log("User try to login but no user found", LogLevel.WARNING, {
          username,
        });
        return response
          .status(404)
          .send({ error: "username or password not valid" });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        user?.hashPassword || ""
      );
      if (!passwordMatch) {
        log("User try to login but it fail", LogLevel.WARNING, { username });
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
      throw new Error("Method not allowed");
    }
  } catch (error) {
    log(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return response.status(500).send({ error: "something went wrong" });
  }
};

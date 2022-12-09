import bcrypt from "bcrypt";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { LogLevel } from "../../backend/const";
import { signToken, validateUser } from "../../backend/helpers/token";
import { getUser } from "../../backend/helpers/user";
import logger from "../../backend/utils/logger";
import { commonResponse } from "../../backend/utils/http";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "GET") {
      // renew or signout user from FE
      if (!request.headers.authorization) {
        logger.warn("User try to renew without token", LogLevel.WARNING);
        return commonResponse.badRequest(response, "Bearer token is missing");
      }

      const { id, name, role } = validateUser(request);
      const token = await signToken({ id, name, role });
      return commonResponse.ok(response, {
        id,
        name,
        role,
        token,
      });
    } else if (request.method === "POST") {
      const { username, password } = request.body;
      if (!username) {
        logger.warn("User try to login without username");
        return commonResponse.badRequest(response, "username not provided");
      }
      if (!password) {
        logger.warn("User try to login without password");
        return commonResponse.badRequest(response, "password not provided");
      }

      // get user
      const user = await getUser(username);
      console.log("🚀 ~ file: sign.ts:39 ~ user", user);
      if (!user) {
        logger.warn("User not found", {
          username,
        });
        return commonResponse.notFound(
          response,
          "username or password not valid"
        );
      }

      // check if passwords are matching
      const passwordMatch = await bcrypt.compare(password, user.hashPassword);
      if (!passwordMatch) {
        logger.warn("Password not match", LogLevel.WARNING, {
          username,
        });
        return commonResponse.notFound(
          response,
          "username or password not valid"
        );
      }

      // sign token
      const token = await signToken({
        id: user.id,
        name: user.name,
        role: Number(user.role),
      });
      return commonResponse.ok(response, {
        name: user.name,
        id: user.id,
        role: Number(user.role),
        token,
      });
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    logger.error(error, LogLevel.ERROR, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return commonResponse.internalServerError(response, "something went wrong");
  }
};

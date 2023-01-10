import bcrypt from "bcrypt";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import {
  signToken,
  validateUser,
  logger,
  getUser,
  internalServerError,
  ok,
  notFound,
  badRequest,
  SECRET_KEY,
  signUpUser,
} from "../../backend/index";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "GET") {
      // renew or signout user from FE
      if (!request.headers.authorization) {
        logger.warn("User try to renew without token");
        return badRequest(response, "Bearer token is missing");
      }

      const { id, name, role } = validateUser(request);
      const token = await signToken({ id, name, role });
      return ok(response, {
        id,
        name,
        role,
        token,
      });
    } else if (request.method === "POST") {
      const { username, password } = request.body;
      if (!username) {
        logger.warn("User try to login without username");
        return badRequest(response, "username not provided");
      }
      if (!password) {
        logger.warn("User try to login without password");
        return badRequest(response, "password not provided");
      }

      // get user
      const user = await getUser(username);
      if (!user) {
        logger.warn("User not found", {
          username,
        });
        return notFound(response, "username or password not valid");
      }

      // check if passwords are matching
      const passwordMatch = await bcrypt.compare(password, user.hashPassword);
      if (!passwordMatch) {
        logger.warn("Password not match", {
          username,
        });
        return notFound(response, "username or password not valid");
      }

      // sign token
      const token = await signToken({
        id: user.id,
        name: user.name,
        role: Number(user.role),
      });
      return ok(response, {
        name: user.name,
        id: user.id,
        role: Number(user.role),
        token,
      });
    } else if (request.method === "PUT") {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Token not provided");
      }

      const signup = jwt.verify(token, SECRET_KEY) as { step: number; timestamp: string };

      if (signup.step == 1) {
        const newToken = jwt.sign({ step: 2 }, SECRET_KEY);
        return ok(response, { token: newToken });
      } else if (signup.step == 2) {
        const { username, password, role } = request.body;
        await signUpUser(username, password, role);
      }
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    logger.error(error, {
      token: request.headers.authorization,
      method: request.method,
      path: request.url,
    });
    return internalServerError(response, "something went wrong");
  }
};
